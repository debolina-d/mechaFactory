// Main JS placeholder for Mecha Factory. Add your scripts here. 
document.addEventListener('DOMContentLoaded', function() {
  var scrollRow = document.querySelector('.services-scroll-row');
  var leftBtn = document.querySelector('.services-arrow-left');
  var rightBtn = document.querySelector('.services-arrow-right');
  if (scrollRow && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', function() {
      scrollRow.scrollBy({ left: -320, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', function() {
      scrollRow.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
}); 