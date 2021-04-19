window.onload = getUser;
async function getUser() {
  /* 프로미스
  그러니까, 이 getUser를 실행시키고
  값을 서버에 보내서 보낸 값에 따라 나온 결과를 다르게
  사용자에게 보여줌
  */
  try {
    //기본적으로 프로미스임, 거기에 async await를 사용하고 있기 때문에
    // try catch로 잡아줌
    const res = await axios.get('/users');
    // GET /users를 서버에 요청
    const users = res.data;
    // 클라이언트 users
    // 그러니까 async안에 있으니까
    // 프로미스로 await로 return을 하고
    // ajax인 axios를 이용하여 서버에 GET으로 users를 서버에 요청해
    // 그 요청값인 JSON형식의 그룹?을 res에 담아놓는다.
    // 그게 JSON형식이니까 console.log를 찍으면
    // { key:value }의 형식으로 나오게 됨.

    const list = document.getElementById('list');
    // const list = document.querySelector('#list');
    list.innerHTML = '';
    /* id가 list인 element를 찾아서 반환한다.
    그러니까 list안에는 list의 id를 가진 tag?가 들어갈테고
    list 안의 자식들은 모두 '', 빈 값으로, 내용을 지운다.
    users는 json형식으로 저장되어 있으니까. key와 value값을 가지고
    Object의 keys를 다 가져오기 위해 객체와 배열 형식으로 가져온다.
    */
    Object.keys(users).map(function (key) {
      /* 이 marameter는 배열의 key값 하나를 나타냄.
    	key에 대한 배열이 나타나고.
    	users의 객체에 있는 key로 구성된 배열이 반환됨
    	이 배열에 대해 map을 쓰는데, 콜백 함수를 실행
    	key가 있는 갯수 만큼 콜백 함수가 실행
    	*/
      const userDiv = document.createElement('div');
      //동적으로 div태그를 만듦
      const span = document.createElement('span');
      //내부에 span이라는 태그를 만듦
      span.textContent = users[key];
      //users에 key에 해당하는 값을 반환해 그 값으로
      // span에 문자를 넣겠다
      const edit = document.createElement('button');
      //btn 생성
      edit.textContent = '수정';
      // btn 안에 수정이란 글자 생성
      edit.addEventListener('click', async () => {
        //click이라는 이벤트 이름에
        //async라는 콜백 화살표함수 사용
        //edit버튼에 삽입
        const name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다');
          //name에 값이 없으면 return을 하여 여기서 종료
        }

        //값이 있으면 실행
        try {
          await axios.put('/user/' + key, { name });
          // promise의 두번째 리턴값
          // ajax를 이용해 서버에 PUT을 하여
          // /user/key값에 삽입
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement('button'); // 버튼 생성
      remove.textContent = '삭제';
      remove.addEventListener('click', async() => {
      	//삭제 이벤트 삽입, async 콜백 사용함
      	// click 하였을 경우...
      	await axiois.delete('/user/'+key);
      	// promise로 await하여 return
      	// ajax를 이용해 서버에 delete를()괄호 안의 매개변수로 삭제요청
      	getUser();
      	// 화면 새로고침용
      	try{
      		await
      	}catch(err){
      		console.error(err);
      	}
      });
      userDiv.appendChild(span);
      // div에 span을 자식으로 넣음
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      // div에 버튼을 자식으로 넣음
      list.appendChild(userDiv);
      // list에 자식으로 div를 넣음
      console.log(res.data);
      // 제대로 작성되었는지 확인함.
    });
    // 첫번째;
  } catch (err) {
    console.error(err);
  }
}
document.getElementById('form').addEventListener('submit', async(e)=>{
	e.preventDefault();//버튼 누르면 바로 작동하니까
	//submit의 이벤트 본래 동작을 하지않게 함
	const name = e.target.username.value;
	//input tag의 userid 입력값을 가져옴
	if(!name){
		return alert('이름을 입력하세요');
	}
	try{
		await axios.post('/user',{ name });// POST /user을 요청함
		getUser();
	}catch(err){
		console.error(err);
	}
	e.target.username.value = ''; //input tag의 기본값 제거
});
