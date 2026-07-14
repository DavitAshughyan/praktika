import PageHeader from "../components/PageHeader.jsx";

export default function CartPage() {
  return (
    <>
      <PageHeader title="Shopping Cart" />

      <section className="cart-page">
        <div className="container">
          <div id="cart-items">
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some products to see them here.</p>
            </div>
          </div>

          <h2 id="cart-total">Total: $0.00</h2>

          <div className="cart-actions">
            <button id="clear-cart">Clear Cart</button>
          </div>
        </div>
      </section>
    </>
  );
}
