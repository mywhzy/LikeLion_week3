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
  //값을 문자열 객체로 저장하기 위하여 JSON.stringify 사용
  localStorage._____(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  //event.target.parentElement -> 부모 속성에 이벤트가 발생
  //어느 항목을 삭제할 것인지 알 수 있게 된다
  const li = event.target.parentElement;
  li.remove();

  //1. filter(배열함수) : ()안의 조건에 맞는 값들만 남겨놓음
  //2. 조건은 지우고자 하는 toDO와 다른 id를 갖고 있는 li들을 남겨놓겠다는 조건
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  //[quiz] appendChild() vs createElement() 비교하고 채워놓기
  const li = document.__________("li");
  li.id = newTodo.id;
  const span = document.__________("span");
  span.innerText = newTodo.text;
  const button = document.__________("button");
  button.innerText = "❌";

  //버튼을 클릭시에 deleteToDo 발생. deleteToDo를 안쓰는 이유는??
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  //제출시에 새로고침 방지
  event.preventDefault();

  //[quiz] toDoInput의 값을 불러와 newTodo에 할당.
  const _____ = toDoInput.value;

  //값을 저장 받은 후, 엔터의 내용들을 지워준다.
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    //Date.now()는 밀리초(1000분의 1초)를 주는 함수이다. 이를 이용하여 각자 다른
    //id를 부여한다.
    id: Date.now(),
  };

  //push함수 검색해보기
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//[quiz] localStorage에서 값 불러오기
const savedToDos = localStorage._____(TODOS_KEY);

//savedToDos가 localStorage에 존재한다면,
if (savedToDos !== null) {

  //불러온 값을 json객체로 변환,
  const parsedToDos = JSON.parse(savedToDos);

  //toDos에 이를 할당,
  toDos = parsedToDos;

  //각각을 paintToDo의 매개변수에 넣어서 실행 
  parsedToDos.forEach(paintToDo);
}
