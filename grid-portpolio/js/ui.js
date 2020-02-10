const menuBtn = document.querySelector('.menuBtn');
const openMenu = document.querySelector('.openMenu');

// openMenu click event
menuBtn.addEventListener('click', function(e){
	e.preventDefault();
    menuBtn.classList.toggle('active');
    openMenu.classList.toggle('active'); 
});

window.addEventListener('resize', function(){
    console.log(window.innerWidth)
});



