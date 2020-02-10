// 각각의 포트폴리오컨텐츠 움직이게 하는 함수 
window.onload = setInterval(function(){
    const linkEl = document.querySelectorAll('.p-p-link');
    for(let i=0; i<linkEl.length; i++){
        linkEl[i].classList.toggle('on');
    }
}, 2000);


