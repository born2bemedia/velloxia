import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [],
  totalAmount: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('totalAmount')) || 0 : 0,
  cartQuantity: 0,

  addToCart: (product) => {
    const { cart, totalAmount } = get();
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let newTotalAmount = totalAmount;

    if (existingIndex === -1) {
      newTotalAmount += product.attributes.price * product.quantity;
      set((state) => ({
        cart: [...state.cart, product],
        totalAmount: newTotalAmount,
        cartQuantity: state.cartQuantity + product.quantity,
        documentId: product.l3sa5guqewi4vox2q7zr1192,
      }));
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
      localStorage.setItem('totalAmount', JSON.stringify(newTotalAmount));
    }
  },

  deleteFromCart: (productId) => {
    const { cart, totalAmount } = get();
    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) return;

    const newTotalAmount = totalAmount - existingItem.attributes.price * existingItem.quantity;
    const updatedCart = cart.filter((item) => item.id !== productId);
    
    set({
      cart: updatedCart,
      totalAmount: newTotalAmount > 0 ? newTotalAmount : 0,
      cartQuantity: updatedCart.reduce((quantity, item) => quantity + item.quantity, 0),
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.setItem('totalAmount', JSON.stringify(newTotalAmount));
  },

  clearCart: () => {
    set({ cart: [], totalAmount: 0, cartQuantity: 0 });
    localStorage.removeItem('cart');
    localStorage.removeItem('totalAmount');
  },

  increaseQuantity: (productId) => {
    const { cart, totalAmount } = get();
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const newTotalAmount = updatedCart.reduce(
      (total, item) => total + item.attributes.price * item.quantity,
      0
    );

    set({
      cart: updatedCart,
      totalAmount: newTotalAmount,
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.setItem('totalAmount', JSON.stringify(newTotalAmount));
  },

  decreaseQuantity: (productId) => {
    const { cart, totalAmount } = get();
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const newTotalAmount = updatedCart.reduce(
      (total, item) => total + item.attributes.price * item.quantity,
      0
    );

    set({
      cart: updatedCart,
      totalAmount: newTotalAmount,
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.setItem('totalAmount', JSON.stringify(newTotalAmount));
  },
}));

export default useCartStore;
