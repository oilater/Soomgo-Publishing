//헤더 메뉴 선택 시 색상 변경
const navList = document.querySelector('.nav-list');
let currentNav;

function navSelectHandler(e) {
const site = e.target;

if (currentNav) {
    currentNav.classList.remove('nav-clicked');
}

site.classList.add('nav-clicked');
currentNav = site;
}

navList.addEventListener('click', navSelectHandler);


//배너 자동 슬라이드
const outer = document.querySelector('.slider');
const innerList = document.querySelector('.inner-list'); // 요소들 감싸는 틀 
const inners = document.querySelectorAll('.inner'); //슬라이드 되는 요소들
let currentIndex = 0; //현재 번호

//요소들에 forEach 돌려줌. 변수에는 그냥 inner로 지정
inners.forEach((inner) => {
    inner.style.width = `${outer.clientWidth}px`; //inner의 wdith 를 모두 outer의 width로 만들기
});

innerList.style.width = `${outer.clientWidth * inners.length}px`; //innerList의 width 를 inner의 width * inner의 개수로 만들기

// 버튼에 event 등록하기
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

buttonLeft.addEventListener('click', () =>{
    currentIndex--;
    currentIndex = currentIndex < 0 ? 0 : currentIndex; // index 값이 0보다 작아질 경우 0으로 변경, 자체가 값으로 나옴!!
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; //index 만큼 margin을 주어 옆으로 밀기

    clearInterval(interval); //기존 동작되던 interval 제거
    interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', ()=> {
    currentIndex++;
    currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex;
    //index 값이 inner의 총 개수보다 많아질 경우 마지막 인덱스 값으로 변경

innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
clearInterval(interval); //기존 동작되던 interval 제거
interval = getInterval(); // 새로운 interval 등록
});

// 주기적으로  화면 넘기기
const getInterval = () => {
    return setInterval(() => {
        currentIndex++;
        currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
        innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`
    }, 5000);
}

let interval = getInterval(); //interval 등록