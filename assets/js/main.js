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

  // --- Mobile Hamburger Menu Toggle ---
  const navbarToggle = document.getElementById('navbar-toggle');
  const desktopMenu = document.getElementById('desktop-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const getInTouch = document.querySelector('.get-in-touch-col');
  function handleResize() {
    if (window.innerWidth <= 900) {
      navbarToggle.style.display = 'block';
      desktopMenu.style.display = 'none';
      mobileMenu.style.display = 'none';
      if (getInTouch) getInTouch.style.display = 'none';
    } else {
      navbarToggle.style.display = 'none';
      desktopMenu.style.display = 'flex';
      mobileMenu.style.display = 'none';
      if (getInTouch) getInTouch.style.display = 'flex';
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);
  let mobileMenuOpen = false;
  navbarToggle.addEventListener('click', function() {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      mobileMenu.style.display = 'flex';
      mobileMenu.style.animation = 'slideInMenu 0.3s';
      if (getInTouch) {
        getInTouch.style.display = 'flex';
        getInTouch.style.width = '100vw';
        getInTouch.style.justifyContent = 'center';
        getInTouch.style.margin = '12px 0 0 0';
      }
    } else {
      mobileMenu.style.display = 'none';
      if (getInTouch) getInTouch.style.display = 'none';
    }
  });
  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        mobileMenu.style.display = 'none';
        if (getInTouch) getInTouch.style.display = 'none';
        mobileMenuOpen = false;
      }
    });
  });
}); 