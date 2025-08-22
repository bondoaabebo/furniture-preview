import { useCart } from "../context/CartContxt";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, total } = useCart();

  return (
    <section className="cart">
      <h2>🛒 سلة المشتريات</h2>
      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} />
              <div className="info">
                <h3>{item.name}</h3>
                <p>{item.price} ج.م</p>
                <div className="actions">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>حذف</button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="total">الإجمالي: {total} ج.م</h3>
          <button className="checkout">إتمام الشراء ✅</button>
        </div>
      )}
    </section>
  );
}

export default Cart;
