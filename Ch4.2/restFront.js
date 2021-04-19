async function getUser() {
  // 로딩 시 사용자 가져오는 함수
  try {
    const res = await axios.get('/users'); // GET /users 요청
    const users = res.data; // 클라이언트 users
    // const list = document.getElementById('list');
    console.log(res.data);
    const list = document.getElementById('list');
    // const list = document.querySelector('#list');
    //id가 list인 element를 찾아 반환
    //list 값<div id="list"></div>
    list.innerHTML = '';
    // innerHTML은 자식 element, 내용지우기
    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    // users는 json이니까 key와 value가 있다.
    // Object의 keys를 다 뽑기위해 객체와 배열 형식으로 가져옴...
    Object.keys(users).map(function (key) {
      //이 parameter는 배열의 key값 하나를 나타냄
      //key에 대한 배열이 나타난다.
      //users의 객체에 있는 key로 구성된 배열이 반환
      //이 배열에 대해 map을 하는데, 콜백 함수를 실행
      //key가 있는 갯수 만큼 콜백 함수개 실행
      const userDiv = document.createElement('div');
      //동적으로 tag들을 만드는 일을 함,
      //내부적으로 div태그를 만듦
      const span = document.createElement('span');
      //내부적으로 span이라는 태그를 만듦
      span.textContent = users[key];
      //users에 해당하는 key를 span태그에 문자로 만들겠다.
      //element의 값이 들어
      const edit = document.createElement('button');
      //button tag가 element로 만들어짐
      edit.textContent = '수정';
      // btn안에 수정이란 글자가 들어감
      edit.addEventListener('click', async () => {
        // 'click'이벤트 이름
        // async()=>{이벤트 실행할 콜백함수}
        // edit이라는 버튼에 이벤트 삽입
        // 수정 버튼 클릭
        const name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다');
        }
        try {
          await axios.put('/user/' + key, { name }); // PUT /user/key값
          getUser(); //
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button'); // 버튼 생성
      remove.textContent = '삭제'; // 버튼에 삭제 글자 생성
      remove.addEventListener('click', async () => {
        // 삭제에 이벤트 삽입, async는 콜백 내용
        // 삭제 버튼 클릭
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span); // <div><span></span></div>
      // div(가 들어간 userDiv객체)에 span을 자식으로 넣는다
      userDiv.appendChild(edit);
      // <div><span><button>삽입</button></span></div>
      userDiv.appendChild(remove);
      // <div><span><button>삽입</button><button>삭제</button></span></div>
      // div객체 안에 버튼 edit과 remove 삽입
      list.appendChild(userDiv);
      console.log(res.data);
      //제대로 됐는지 출력
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault(); //submit의 이벤트 본래 동작을 안하게 함
  const name = e.target.username.value; // input tag의 userid 입력값을 가져옴
  if (!name) {
    return alert('이름을 입력하세요');
  }
  try {
    await axios.post('/user', { name }); // POST /user 요청
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = ''; //input tag의 기본값을 제거
});
