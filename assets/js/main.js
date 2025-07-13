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

  // --- ScrollSpy Sidebar Hover Sync ---
  document.querySelectorAll('.service-block').forEach(function(block) {
    var service = block.getAttribute('data-service');
    var sidebarItem = document.querySelector('.scrollspy-item[data-service="' + service + '"]');
    if (sidebarItem) {
      block.addEventListener('mouseenter', function() {
        console.log('Hovering service-block:', service);
        sidebarItem.classList.add('hover-active');
        console.log('Added hover-active to:', sidebarItem);
      });
      block.addEventListener('mouseleave', function() {
        sidebarItem.classList.remove('hover-active');
        console.log('Removed hover-active from:', sidebarItem);
      });
    } else {
      console.log('No sidebar item found for service:', service);
    }
  });
}); 