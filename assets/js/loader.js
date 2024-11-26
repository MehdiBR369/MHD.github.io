let preLoader = document.querySelector('.loader-container');
window.addEventListener('load', function(){
    setTimeout(function(){
        preLoader.className += ' hidden';
    }, 5000);
});