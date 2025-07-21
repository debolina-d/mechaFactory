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
        sidebarItem.classList.add('hover-active');
      });
      block.addEventListener('mouseleave', function() {
        sidebarItem.classList.remove('hover-active');
      });
    }
  });

  // --- Smooth Scroll for ScrollSpy Sidebar Links Only ---
  var servicesNav = document.getElementById('services-nav');
  if (servicesNav) {
    servicesNav.addEventListener('click', function(e) {
      var link = e.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href').length > 1) {
        var targetId = link.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // --- (Mobile Hamburger Menu Toggle logic removed to avoid conflict) ---
}); 