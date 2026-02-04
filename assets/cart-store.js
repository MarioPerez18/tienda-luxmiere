document.addEventListener('alpine:init', () => {
   if (!window.Alpine) {
    console.error('Alpine no está cargado')
    return
  } 
  console.log('🔥 Alpine iniciado');
  Alpine.store('cart', {
    items: [],
    loading: false,
    

    fetchCart() {
      this.loading = true
      fetch('/cart.js')
        .then(res => res.json())
        .then(cart => {
          this.items = cart.items
          this.loading = false
        })
    },

    updateItem(key, quantity) {
      this.loading = true
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: key,
          quantity
        })
      }).then(() => this.fetchCart())
    },

    get subtotal() {
      return this.items.reduce(
        (sum, item) => sum + item.final_line_price,
        0
      )
    }
    
  })
})