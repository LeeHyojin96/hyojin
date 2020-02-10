window.onload = function(){

let htmlEl = document.querySelector('html');
let headerEl = document.querySelector('.header');
let gnbEl = document.querySelector('.gnb');
let topRightEl = document.querySelector('.topRight');
let topSearchEl = document.querySelector('.topSearch');
let mainSliderUl = document.querySelector('.bxslider');
let mainSlider_prevBtn = document.querySelector('.main-prevBtn');
let mainSlider_nextBtn = document.querySelector('.main-nextBtn');
let mainSlider_btn = document.querySelector('.mainSlider_btn');
let mainSlider_stopBtn = document.querySelector('.stopBtn');
let mainSlider_playBtn = document.querySelector('.playBtn');
let tabBar = document.querySelectorAll('.tabBar > li');
let tabPage = document.querySelectorAll('.tabContent > .tabPage');
let tabPage_active = document.querySelector('.tabContent > .active > ul');
// header메뉴 스크롤이벤트
window.addEventListener('scroll', function(e){
    if(htmlEl.scrollTop > 70){
        headerEl.classList.add('scroll');
    }else{
        headerEl.classList.remove('scroll');
    }
});

// gnb메뉴 hover시 header class주기
gnbEl.addEventListener('mouseover', function(e){
    headerEl.classList.add('active');
});
gnbEl.addEventListener('mouseout', function(e){
    headerEl.classList.remove('active');
});

// topSearch click이벤트
topRightEl.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('topSearch')){
        topSearchEl.classList.toggle('openSearch');
    }
})
$('.bxslider').bxSlider({
    auto: true, 
    speed: 100, 
    mode:'fade', 
    autoControls: false, 
    pager:false,
    autoHover: false,
    infiniteLoop: true,
});


// // mainvisual slide
// let clickLeft = 0;
// let slideMove;
// mainSlider_prevBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     if(parseInt(clickLeft) === 0) {return;}
//     clickLeft = (parseInt(clickLeft) + 1404) + 'px';
//     mainSliderUl.style.left = clickLeft;
// })
// mainSlider_nextBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     if(parseInt(clickLeft) === -2808) {return}
//     clickLeft = (parseInt(clickLeft) - 1404) + 'px';
//     mainSliderUl.style.left = clickLeft;
// })

// movingMaker();
// function movingMaker(){
//     clickLeft = 0;
//     mainSliderUl.style.left = clickLeft;
//     slideMove = setInterval(() => {
//         check();
//         clickLeft = (parseInt(clickLeft) - 1404) + 'px';
//         mainSliderUl.style.left = clickLeft;
//         console.log(parseInt(clickLeft)) 
//     }, 2000);
// }
// // 슬라이드가 맨끝까지 갔을때를 체크하는 함수. 하지만 왜 -2808이 아닌 -1404를 넣어야 작동하는게 의문이라 더 알아봐야함. 
// function check(){ 
//     if(parseInt(clickLeft) === -1404) {
//        clearInterval(slideMove);
//        setTimeout(function(){
    
//             movingMaker();
//        }, 2000);
//     }
// }
// // mainSlider stop/play 버튼 이벤트
// mainSlider_btn.addEventListener('click', function(e){
//     if(e.target === mainSlider_stopBtn){
//         clearInterval(slideMove);
//         mainSlider_stopBtn.style.display = 'none';
//         mainSlider_playBtn.style.display = 'block';
//     }
//     else if(e.target === mainSlider_playBtn){
//         movingMaker();
//         mainSlider_stopBtn.style.display = 'block';
//         mainSlider_playBtn.style.display = 'none';
//     }
// });

// // tabContent 메뉴 이벤트
// for (let i = 0; i < tabBar.length; i++) {
// 	tabBar[i].onclick = (function (j) {
// 		return function (e) { 
// 			for (let k = 0; k < tabPage.length; k++) {
// 				tabPage[k].classList.remove("active");
// 				tabBar[k].classList.remove("active"); 
// 			}
// 			tabPage[j].classList.add("active");
// 			this.classList.add("active"); 
// 			return false;  
// 		}
// 	})(i);
// }

// //







}