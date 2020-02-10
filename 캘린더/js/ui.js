window.onload = function(){
let today = new Date();
const calendarBody = document.querySelector('.calendar-body');
const prevEl = document.querySelector('.prev');
const nextEl = document.querySelector('.next');
const inputBox = document.querySelector('.input-box');
const inputBtn = document.querySelector('.input-data');
const inputList = document.querySelector('.input-list');
let currentDate;
let store = {};


buildCalendar();
function buildCalendar(){
    let firstDate = new Date(today.getFullYear(), today.getMonth(),1);
    let lastDate = new Date(today.getFullYear(), today.getMonth()+1,0);
    const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const leapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
    const notLeapYear = [31,28,31,30,31,30,31,31,30,31,30,31];
    const currentTitle = document.querySelector('.current-year-month');
    // 윤년 체크하기
    if(firstDate.getFullYear() % 4 === 0){
        pageYear = leapYear;
    }else {
        pageYear = notLeapYear;
    }
    // current-year-month에 현재 년도와 월을 넣어준다. 월은 getMonth()에서 반환하는 숫자와 monthList의 index번호를 매칭시켜서 입력시키도록 한다.
    currentTitle.innerHTML = monthList[firstDate.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ today.getFullYear();
    // 달력 출력
    let weekly = 100;
    let Currentdate = 1;
    for(let i = 0; i < 6; i++){
        let trEl = document.createElement('tr');
        trEl.setAttribute('class', weekly);
        for(let j = 0; j < 7; j++){
            // firstDate.getMonth() => 현재 달의 일수가 몇일인지 반환해주고, 이 조건은 반환 된 값에 따라 출력해 준 후, 달력 출력 종료조건이다.
            if(i === 0 && j < firstDate.getDay() || Currentdate > pageYear[firstDate.getMonth()]){
                let tdEl = document.createElement('td');
                trEl.appendChild(tdEl);
            }else {
                let tdEl = document.createElement('td');
                tdEl.textContent = Currentdate;
                tdEl.setAttribute('class', Currentdate);
                trEl.appendChild(tdEl);
                Currentdate++;
            }
        }
        weekly++;
        calendarBody.appendChild(trEl);
    }
    // 현재 날짜에 항상 표시하고, 이전 달, 다음 달 로 넘어갔을때도 현재날짜 또는 내가 선택한 날짜에 항상 표시될 수 있게 해준다.
    clickedDate = document.getElementsByClassName(today.getDate());
    clickedDate[0].classList.add('active');
    showMain();
    currentDateget();
    resetInsert();
}

function removeCalendar(){ 
    let trEls = document.querySelectorAll('.calendar-body > tr');
    for(let i = 0; i < trEls.length; i++){
        trEls[i].remove();
    }
}

// 왼쪽에 현재 날짜 업데이트 해주기.
function showMain(){
    const mainDay = document.querySelector('.main-day');
    const mainDate = document.querySelector('.main-date');
    const dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    mainDay.innerHTML = dayList[today.getDay()];
    mainDate.innerHTML = today.getDate();
}

prevEl.addEventListener('click', function(){
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    removeCalendar();
    buildCalendar();
    resetInsert();
    redrawLi()
});
nextEl.addEventListener('click', function(){
    today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    removeCalendar();
    buildCalendar();
    resetInsert();
    redrawLi()
});

function currentDateget(){
    // selectionDate에 현재 선택한 날짜를 0000. 0. 00. 식으로 나올 수 있게 toLocaleDateString()를 사용하여 할당해준다.
    selectionDate = today.toLocaleDateString();
    // toLocaleDateString로 받아온 날짜에 공백과 마침표 제거해주고 join으로 공백없이 붙혀주기.
    let refreshDate = selectionDate.split('. ').join('');
    // 마침표뒤에 공백이 오는 문자만 제거 하게 되어서 마지막 마침표가 제거가 되지 않아 substr로 맨 마지막 문자열 잘라주기.
    currentDate = refreshDate.substr(0, refreshDate.length-1);
}

calendarBody.addEventListener('click', function(e){
    let eachDate = document.querySelectorAll('tbody > tr > td');
    if(e.target.innerHTML === '') return;
    for(let i = 0; i < eachDate.length;i++){
        eachDate[i].classList.remove('active');
    }
    let btn = e.target;
    btn.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), btn.innerHTML);
    showMain();
    currentDateget();
    redrawLi();
    resetInsert();
});

inputBtn.addEventListener('click', function(e){
    e.preventDefault();
    let inputValue = inputBox.value;
    insertTodo(inputValue);
});

function insertTodo(text){
    let todoObj = {
        todo: text,
    }
    if (!store[currentDate]) {
        store[currentDate] = [];
        store[currentDate].push(todoObj);
    } else {
        store[currentDate].push(todoObj);
    }
    const liEl = document.createElement('li');
    const spanEl = document.createElement('span');
    const delBtn = document.createElement('button');
    delBtn.innerText = "DEL";
    delBtn.setAttribute('class', 'del-data');
    spanEl.innerHTML = text;
    liEl.appendChild(spanEl);
    liEl.appendChild(delBtn);
    inputList.appendChild(liEl);
    liEl.setAttribute('id', store[currentDate].length);
    delBtn.addEventListener('click', delWork);
    // todoObj에 id값을 114번 줄에서 넣어주면 store[currentDate].length 값을 찾아올 수 없기 때문에 push해준 후 에 추가하여 local에 저장한다.
    todoObj.id = store[currentDate].length;
    save();
    inputBox.value = '';
}

function redrawLi(text){
    // 다른 날짜를 클릭했을때 그 전에 작성한 totolist목록을 먼저 다 지우기 위해 li와 span을 찾아와 for문으로 지워주고 다시 그려준다.
    let liEl = document.querySelectorAll('LI');
    for(let i = 0; i < liEl.length; i++){
        inputList.removeChild(liEl[i]);
    }
    for (todoList in store){
        if (todoList === currentDate) {
            for(let i = 0; i < store[todoList].length; i++){
                const liEl2 = document.createElement('li');
                const spanEl2 = document.createElement('span');
                const delBtn2 = document.createElement('button');
                delBtn2.innerText = "DEL";
                delBtn2.setAttribute('class', 'del-data');
                spanEl2.innerHTML = store[todoList][i].todo;
                liEl2.appendChild(spanEl2);
                liEl2.appendChild(delBtn2);
                inputList.appendChild(liEl2);
                liEl2.setAttribute('id',  store[todoList][i].id);
                delBtn2.addEventListener('click', delWork);
            }
        }
    } 
}

function delWork(e){
    e.preventDefault();
    let delParentLi =  e.target.parentNode;
    inputList.removeChild(delParentLi);
    // store[currentDate]를 filter함수를 이용해 todo로 돌면서 todo의 아이디값과 현재 내가 누른 아이디값이 같지 않은 것을 배열에 담아 리턴해주어서 
    // 내가 지우고자 하는 요소를 뺀 나머지 요소를 배열에 담아 리턴해준다. 
    // 그 배열을 다시 store[currentDate]에 할당하여 save();를 통해 localStorage에 넣어준다.
    const cleanToDos = store[currentDate].filter(function(todo){
        return todo.id !== parseInt(delParentLi.id);
    });
    store[currentDate] = cleanToDos;
    save();
}

function resetInsert(){
    let storeObj = localStorage.getItem(currentDate);
    if(storeObj !== null){
        let liEl = document.querySelectorAll('LI');
        for(let i = 0; i < liEl.length; i++){
            inputList.removeChild(liEl[i]);
        }
        // parse 해주기 전에는 localStorage는 string만 가져오니까 parse해준다.
        const parsed = JSON.parse(localStorage.getItem(currentDate));
        // forEach로 작성되있는 모든 todolist의 항목들을 돌면서 로컬에 저장되어 있는 목록을 화면에 만들어준다.
        parsed.forEach(function(todo){
            // 다음달,이전달 다른날을 클릭했을때 todo 목록이 있으면 다 지우고 다시 그려주는 함수를 써주고,
            // 아무것도 없다면 insertTodo로 새로 그려준다.
            if(todo){
                let lili = document.createElement('li');
                let spanspan = document.createElement('span');
                let deldel = document.createElement('button');
                deldel.setAttribute('class', 'del-data');
                deldel.innerText = "DEL";
                lili.setAttribute('id', todo.id);
                spanspan.innerHTML = todo.todo;
                lili.appendChild(spanspan);
                lili.appendChild(deldel);
                inputList.appendChild(lili);
                deldel.addEventListener('click', delWork);
            }
        });
    }
}
resetInsert();

function save(){
    localStorage.setItem(currentDate, JSON.stringify(store[currentDate]));
}
}