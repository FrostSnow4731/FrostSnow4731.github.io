const data = {
  "총학생회": [
    { name: "나나가미 린", image: "https:/FrostSnow4731.github.io/images/shiroko.png" }
  ]
};

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
                ${data[academyName][group].map(s => `<li>${s}</li>`).join('')}
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
          listItem.style.display = 'flex';
          listItem.style.alignItems = 'center';
          listItem.style.justifyContent = 'center';
          listItem.style.marginBottom = '10px';

          // 이미지 태그 생성
          const image = document.createElement('img');
          image.src = student.image;
          image.alt = student.name;
          image.style.width = '40px'; // 이미지 크기 설정
          image.style.height = '40px'; // 이미지 크기 설정
          image.style.marginRight = '10px'; // 이미지와 이름 사이 간격 설정

          // 이름 텍스트 생성
          const name = document.createElement('span');
          name.textContent = student.name;

          listItem.appendChild(image);
          listItem.appendChild(name);
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
  /* 팝업 스타일 및 애니메이션 */
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
                url('https://i.imgur.com/q9BYdnw.jpeg') no-repeat center center;
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    transform: translate(-50%, -60%);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .popup.show {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  .popup.hide {
    opacity: 0;
    transform: translate(-50%, -60%);
  }

  /* 이미지 스타일 */
  img {
    border-radius: 50%;
    margin-right: 10px;
  }

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
`;
document.head.appendChild(style);
