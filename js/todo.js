//HTML에서 id="todo-form"을 가진 요소를 불러와 toDoForm이라는 변수에 할당 
const toDoForm = document.getElementById("todo-form");

//HTML에서 id="todo-form"에서 input 요소를 불러와 toDoInput이라는 변수에 할당
//구체적인 요소를 불러올 때 querySelector의 필요성을 볼 수 있는 예시!
const toDoInput = document.querySelector("#todo-form input");

//HTML에서 id="todo-list"을 가진 요소를 불러와 toDoList이라는 변수에 할당 
const toDoList = document.getElementById("todo-list");

//"todos"라는 문자열을 2번 이상 사용하기 때문에 전역에서 관리
const TODOS_KEY = "todos";

//toDos라는 배열 선언.
let toDos = [];

function saveToDos() {
  //[quiz] 값 추가 : 'localStorage'를 참고하여 값 추가하기
  //값을 문자열 객체로 저장하기 위하여 JSON.stringify 사용 +)localstorage는 array저장 불가 text만 저장가능
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  //(X버튼 눌렀을 때 그에 해당하는) 부모요소(toDo내용) 삭제하기
  const li = event.target.parentElement;
  li.remove();

  //삭제된 toDo내용 localStroage에도 적용하기
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function completedTodo(event) {
  const li = event.target.parentElement;

  //is_checked는 checkbox의 상태에 따라 boolean 값을 갖게 됨
  const is_checked = li.firstChild.checked;

  //[quiz] 체크 박스가 체크가 되었다면 if 부분이 실행, 아니면 else 부분 실행
  if (is_checked === true) {
    li.style.textDecoration = "line-through";
    li.style.color = "grey";
  } else {
    li.style.textDecoration = "solid";
    li.style.color = "black";
  }
  saveToDos();
}

function paintToDo(newTodo) {
  //[quiz] appendChild() vs createElement() 비교하고 채워놓기
  const li = document.createElement("li");
  li.id = newTodo.id;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  checkbox.addEventListener("click", completedTodo);
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  //input 클릭 시 발생하는 페이지 리로드 이벤트(submit관련 이벤트) 막아주기
  event.preventDefault();

  //[quiz] toDoInput의 값을 불러와 newTodo에 할당.
  const newTodo = toDoInput.value;

  //값을 저장 받은 후, 엔터의 내용들을 지워준다.
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    //Date.now()는 밀리초(1000분의 1초)를 주는 함수이다. 이를 이용하여 각자 다른
    //id를 부여한다.
    id: Date.now(),
  };

  //push함수 검색해보기 / toDos배열에 newTodoObj(새 toDo내용) 추가해준다는 뜻
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//[quiz] localStorage에서 값 불러오기
const savedToDos = localStorage.getItem(TODOS_KEY);


//savedToDos가 localStorage에 존재한다면,
if (savedToDos !== null) {

  //이전에 문자열객체로 저장한 saveToDos를 JSON 객체로 저장
  const parsedToDos = JSON.parse(savedToDos);

  //toDos에 이를 할당,
  toDos = parsedToDos;

  //paintToDo를 parsedToDos 요소들에 적용
  parsedToDos.forEach(paintToDo);
}

//역시 갓민철~~~~~~~ 그때 열심히 달아주신 주석이 이거였구나... 주석의 힘이 컸습니다 감사합니다 최고최고🥰