const data = {
  "총학생회": [
    { name: "나나가미 린", imageUrl: "https://FrostSnow4731.github.io/images/rin.png" },
    { name: "유라키 모모카", imageUrl: "https://FrostSnow4731.github.io/images/momoka.png" },
    { name: "이와비츠 아유무", imageUrl: "https://FrostSnow4731.github.io/images/ayumu.png" },
    { name: "시라누이 카야", imageUrl: "https://FrostSnow4731.github.io/images/kaya.png" },
    { name: "오키 아오이", imageUrl: "https://FrostSnow4731.github.io/images/aoi.png" },
    { name: "스모모", imageUrl: "https://FrostSnow4731.github.io/images/sumomo.png" },
    { name: "하이네", imageUrl: "https://FrostSnow4731.github.io/images/haine.png" }
  ],
  "샬레": [
    { name: "선생님", imageUrl: "https://FrostSnow4731.github.io/images/ssn.png" },
    { name: "아로나", imageUrl: "https://FrostSnow4731.github.io/images/arona.png" },
    { name: "프라나", imageUrl: "https://FrostSnow4731.github.io/images/prna.png" }
  ],
   "아비도스": [
    { name: "타카나시 호시노", imageUrl: "https://FrostSnow4731.github.io/images/Hoshino.png" },
    { name: "이자요이 노노미", imageUrl: "https://FrostSnow4731.github.io/images/Nonomi.png" },
    { name: "스나오오카미 시로코", imageUrl: "https://FrostSnow4731.github.io/images/shiroko.png" },
    { name: "쿠로미 세리카", imageUrl: "https://FrostSnow4731.github.io/images/Serika.png" },
    { name: "오쿠소라 아야네", imageUrl: "https://FrostSnow4731.github.io/images/0176.png" },
    { name: "스나오오카미 시로코(테러)", imageUrl: "https://FrostSnow4731.github.io/images/0263.png" },
  ]
};

document.getElementById('intro').addEventListener('click', () => {
  document.getElementById('intro').classList.add('hidden');
});

let currentPopup = null; // 현재 팝업을 추적

function closePopup() {
  if (currentPopup) {
    currentPopup.classList.remove('show'); // 'show' 클래스를 제거하여 닫기 애니메이션 적용
    currentPopup.classList.add('hide'); // 'hide' 클래스를 추가
    setTimeout(() => {
      if (currentPopup && currentPopup.parentNode) {
        currentPopup.parentNode.removeChild(currentPopup); // 애니메이션 후 팝업 제거
        currentPopup = null; // 현재 팝업 초기화
      }
    }, 300); // 애니메이션 시간 (0.3초) 후 제거
  }
}

document.querySelectorAll('.academy').forEach(academy => {
  academy.addEventListener('click', () => {
    if (currentPopup) {
      closePopup(); // 기존 팝업 닫기
      setTimeout(createPopup, 300); // 팝업 닫기 애니메이션 후 새 팝업 생성
    } else {
      createPopup();
    }

    function createPopup() {
      const academyName = academy.querySelector('p').textContent;

      // 팝업 생성
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('popup', 'hide'); // 처음에는 'hide' 상태로 생성
      document.body.appendChild(contentDiv);
      currentPopup = contentDiv; // 현재 팝업 추적

      // 학원명 헤더와 닫기 버튼 생성
      const header = document.createElement('div');
      header.classList.add('popup-header');
      header.innerHTML = `
        <h2>${academyName}</h2>
        <button class="close-button">
          <img src="https://i.imgur.com/pdYHPD6.png" alt="닫기" />
        </button>
      `;
      const closeButton = header.querySelector('.close-button');
      closeButton.addEventListener('click', closePopup); // 닫기 버튼 이벤트 리스너 추가

      // 팝업창에 헤더 추가
      contentDiv.appendChild(header);

      // 팝업 내용 설정
      if (typeof data[academyName] === 'object' && !Array.isArray(data[academyName])) {
        // 동아리가 있는 학원
        const subGroups = Object.keys(data[academyName]);
        const list = document.createElement('ul');
        list.style.listStyle = 'none'; // 리스트 스타일 제거
        list.style.textAlign = 'center'; // 리스트 중앙 정렬

        subGroups.forEach(group => {
          const listItem = document.createElement('li');
          listItem.textContent = group;
          listItem.style.cursor = 'pointer';
          listItem.addEventListener('click', () => {
            contentDiv.innerHTML = `
              <button class="back-button">돌아가기</button>
              <h2>${group}</h2>
              <ul style='list-style: none; text-align: center;'>
                ${data[academyName][group].map(student => `
                  <li>
                    <img src="${student.imageUrl}" alt="${student.name}" style="width: 50px; height: 50px; margin-right: 50px; border-radius: 50%;" />
                    ${student.name}
                  </li>
                `).join('')}
              </ul>
            `;
            const backButton = document.querySelector('.back-button');
            backButton.addEventListener('click', () => {
              contentDiv.innerHTML = '';
              contentDiv.appendChild(header); // 헤더를 다시 추가
              contentDiv.appendChild(list); // 동아리 목록을 다시 추가
            });
          });
          list.appendChild(listItem);
        });

        contentDiv.appendChild(list);
      } else if (Array.isArray(data[academyName])) {
        // 동아리가 없는 학원
        const students = data[academyName];
        const studentList = document.createElement('ul');
        studentList.style.listStyle = 'none';
        studentList.style.textAlign = 'center';

        students.forEach(student => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <img src="${student.imageUrl}" alt="${student.name}" style="width: 206px; height: 163px; margin-right: 10px; border-radius: 0%;" />
            ${student.name}
          `;
          studentList.appendChild(listItem);
        });

        contentDiv.appendChild(studentList);
      } else {
        contentDiv.innerHTML += `<p>학생 명부가 없습니다.</p>`;
      }

      // 팝업 표시 애니메이션
      setTimeout(() => {
        contentDiv.classList.remove('hide');
        contentDiv.classList.add('show'); // 'show' 클래스를 추가하여 나타나는 애니메이션 적용
      }, 10); // 약간의 딜레이를 추가하여 애니메이션 트리거
    }
  });
});


// CSS for popup with close button
const style = document.createElement('style');
style.textContent = `
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
              url('http://FrostSnow4731.github.io/images/background 4.jpg') no-repeat center center;
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80vw;
  max-width: 95%;
  height: 70vh;
  overflow-y: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transform: translate(-50%, -60%);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 팝업 표시될 때 애니메이션 */
.popup.show {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.popup.hide {
  opacity: 0;
  transform: translate(-50%, -60%);
}

/* 동아리 학생 리스트에 격자형 레이아웃 적용 */
.popup ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 각 이미지를 더 작은 크기로 설정 */
  gap: 18px;
  padding: 0;
  list-style: none;
  text-align: center;
}

/* 각 이미지 스타일 */
.popup ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup ul li img {
  width: 196px;
  height: 196px;
  border-radius: 50%;
  margin-bottom: 10px;
}

/* 뒤로가기 버튼 스타일 */
.back-button {
  display: inline-block;
  margin: 10px auto;
  background: #007BFF;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.back-button:hover {
  background: #0056b3;
}

/* 반응형 모바일 설정 */
@media (max-width: 768px) {
  .popup {
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
                url('http://FrostSnow4731.github.io/images/background 2.png') no-repeat center center;
    background-size: cover;
    width: 90vw; /* 모바일에서 팝업 너비 더 넓게 */
    height: 80vh; /* 팝업 높이를 더 키움 */
    padding: 15px; /* 패딩을 약간 줄임 */
  }

  .popup ul {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 이미지 크기를 더 작게 설정 */
    gap: 10px; /* 더 작은 간격 */
  }

  .popup ul li img {
    width: 110px; /* 이미지 크기를 더 작게 설정 */
    height: 110px; /* 이미지 크기를 더 작게 설정 */
  }

  .back-button {
    font-size: 12px; /* 버튼 텍스트 크기 줄임 */
    padding: 4px 8px; /* 버튼 크기 줄임 */
  }
}

@media (max-width: 480px) {
  .popup {
    width: 95vw; /* 더 작은 화면에서 팝업 너비를 95%로 확장 */
    height: 90vh; /* 팝업을 더 키움 */
    padding: 10px; /* 패딩을 더 줄임 */
  }

  .popup ul {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* 모바일에서 한 열로 표시 */
    gap: 8px; /* 더 작은 간격 */
  }

  .popup ul li img {
    width: 90px; /* 이미지 크기를 더 작게 설정 */
    height: 90px; /* 이미지 크기를 더 작게 설정 */
  }

  .back-button {
    font-size: 10px; /* 버튼 크기 더 작게 */
    padding: 3px 6px; /* 버튼 크기 줄임 */
  }
}

.back-button:hover {
  background: #0056b3;
}
`;
document.head.appendChild(style);
