document.addEventListener('alpine:init', () => {
  console.log('🔥 Alpine iniciado');

  Alpine.store('cart', {
    items: [],

    init() {
      console.log('🛒 Store cart iniciado');
      this.fetchCart();
    },

    fetchCart() {
      console.log('📦 Fetch cart');
      fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
          console.log('✅ Cart data', cart);
          this.items = cart.items;
        });
    },

    updateItem(key, quantity) {
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      }).then(() => this.fetchCart());
    }
  });
});
