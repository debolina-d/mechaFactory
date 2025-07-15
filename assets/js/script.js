// Product and Cart Logic for MechaRetail
const products = [
  {
    id: 1,
    name: 'Stainless Steel Bolts',
    price: 150,
    image: 'images/bolts.jpg',
    desc: 'High-strength bolts for industrial assemblies',
  },
  {
    id: 2,
    name: 'Precision Gears',
    price: 250,
    image: 'images/gears.jpg',
    desc: 'Durable metal gears for high-precision systems',
  },
  {
    id: 3,
    name: 'Ball Bearings',
    price: 300,
    image: 'images/bearing.jpg',
    desc: 'Smooth-rolling bearings for frictionless motion',
  },
  {
    id: 4,
    name: 'Shaft Coupler',
    price: 180,
    image: 'images/coupler.jpg',
    desc: 'Reliable couplers for shaft and motor alignment',
  },
];

let cart = [];

function updateCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItemsDiv = cartSidebar.querySelector('.cart-items');
  const cartTotalSpan = cartSidebar.querySelector('.cart-total');
  const cartFooter = cartSidebar.querySelector('.cart-footer');
  // Update cart badge
  const cartBadge = document.getElementById('cart-badge');
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (itemCount > 0) {
    cartBadge.textContent = itemCount;
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }
  // Remove any previous empty message
  let emptyMsg = cartSidebar.querySelector('.cart-empty-message');
  if (emptyMsg) emptyMsg.remove();
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '';
    cartFooter.style.display = 'none';
    const msg = document.createElement('div');
    msg.className = 'cart-empty-message';
    msg.textContent = 'Your cart is empty. Start shopping!';
    cartSidebar.insertBefore(msg, cartItemsDiv);
  } else {
    if (cartSidebar.querySelector('.cart-empty-message')) {
      cartSidebar.querySelector('.cart-empty-message').remove();
    }
    cartFooter.style.display = '';
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-qty">
            <button class="qty-btn minus" data-id="${item.id}">–</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-total">₹${itemTotal}</div>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });
    cartTotalSpan.textContent = `₹${total}`;
    // Add event listeners for cart qty buttons
    cartItemsDiv.querySelectorAll('.qty-btn.minus').forEach(btn => {
      btn.onclick = function() {
        const id = parseInt(btn.getAttribute('data-id'));
        const cartItem = cart.find(i => i.id === id);
        if (cartItem && cartItem.qty > 1) {
          cartItem.qty--;
        } else if (cartItem && cartItem.qty === 1) {
          // Remove from cart
          cart = cart.filter(i => i.id !== id);
        }
        updateCartSidebar();
        updateProductCards();
      };
    });
    cartItemsDiv.querySelectorAll('.qty-btn.plus').forEach(btn => {
      btn.onclick = function() {
        const id = parseInt(btn.getAttribute('data-id'));
        const cartItem = cart.find(i => i.id === id);
        if (cartItem) {
          cartItem.qty++;
        }
        updateCartSidebar();
        updateProductCards();
      };
    });
  }
}

function openCartSidebar() {
  document.getElementById('cart-sidebar').classList.add('open');
}
function closeCartSidebar() {
  document.getElementById('cart-sidebar').classList.remove('open');
}

function updateProductCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    const productId = parseInt(card.getAttribute('data-product-id'));
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const qtySelector = card.querySelector('.quantity-selector');
    const minusBtn = qtySelector.querySelector('.qty-btn.minus');
    const plusBtn = qtySelector.querySelector('.qty-btn.plus');
    const qtyValue = qtySelector.querySelector('.qty-value');
    const cartItem = cart.find(item => item.id === productId);
    // Remove all previous event listeners by cloning
    const newMinusBtn = minusBtn.cloneNode(true);
    const newPlusBtn = plusBtn.cloneNode(true);
    minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);
    plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
    if (cartItem) {
      qtySelector.style.display = 'flex';
      addToCartBtn.style.display = 'none';
      qtyValue.textContent = cartItem.qty;
      newMinusBtn.disabled = cartItem.qty <= 0;
      newPlusBtn.disabled = false;
      newMinusBtn.onclick = function() {
        if (cartItem.qty > 0) {
          cartItem.qty--;
          if (cartItem.qty === 0) {
            // Remove from cart and show Add to Cart btn
            cart = cart.filter(item => item.id !== productId);
            updateCartSidebar();
            updateProductCards();
            return;
          }
          updateCartSidebar();
          updateProductCards();
        }
      };
      newPlusBtn.onclick = function() {
        let item = cart.find(item => item.id === productId);
        if (!item) {
          const product = products.find(p => p.id === productId);
          cart.push({ ...product, qty: 1 });
        } else {
          item.qty++;
        }
        updateCartSidebar();
        updateProductCards();
      };
    } else {
      // If not in cart, show Add to Cart btn, hide selector
      qtySelector.style.display = 'none';
      addToCartBtn.style.display = 'block';
      addToCartBtn.onclick = function() {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, qty: 1 });
        updateCartSidebar();
        updateProductCards();
      };
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial state
  updateProductCards();
  // Quantity selector logic
  // The event listeners are now handled within updateProductCards
  // Cart sidebar close
  document.getElementById('cart-close').addEventListener('click', closeCartSidebar);
  // Checkout button logic
  document.querySelector('.checkout-btn').addEventListener('click', function() {
    document.querySelector('.cart-items').style.display = 'none';
    document.querySelector('.cart-footer').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'flex';
  });
  // Back to cart button
  document.querySelector('.back-to-cart-btn').addEventListener('click', function() {
    document.querySelector('.cart-items').style.display = '';
    document.querySelector('.cart-footer').style.display = '';
    document.getElementById('checkout-form').style.display = 'none';
  });
  // Place order logic
  document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    if (!name || !phone || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    // Optionally, validate phone number format
    if (!/^\d{10,}$/.test(phone)) {
      alert('Please enter a valid phone number.');
      return;
    }
    // Success: show message, reset cart and form
    alert('Order placed successfully! Thank you, ' + name + '.');
    cart = [];
    updateCartSidebar();
    updateProductCards();
    form.reset();
    document.querySelector('.cart-items').style.display = '';
    document.querySelector('.cart-footer').style.display = '';
    document.getElementById('checkout-form').style.display = 'none';
    closeCartSidebar();
  });
  // Floating cart button logic
  document.getElementById('floating-cart-btn').addEventListener('click', function() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar.classList.contains('open')) {
      closeCartSidebar();
    } else {
      openCartSidebar();
    }
  });
}); 