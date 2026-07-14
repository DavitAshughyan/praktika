export default function Gallery() {
  return (
    <section id="gallery">
      <div className="container">
        <div className="filters">
          <input type="number" id="min-price" placeholder="Price from" />

          <input type="number" id="max-price" placeholder="Price to" />

          <select id="category-filter">
            <option value="all">📦 All categories</option>
            <option value="electronics">📱 Electronics</option>
            <option value="jewelery">💍 Jewelery</option>
            <option value="men's clothing">👔 Men's clothing</option>
            <option value="women's clothing">👗 Women's clothing</option>
          </select>

          <select id="sort-filter">
            <option value="default">🔄 Default</option>
            <option value="price-asc">📈 Price: Low → High</option>
            <option value="price-desc">📉 Price: High → Low</option>
            <option value="rating-desc">⭐ Rating: High → Low</option>
          </select>

          <select id="rating-filter">
            <option value="0">⭐ All ratings</option>
            <option value="4">4+ ⭐⭐⭐⭐</option>
            <option value="3">3+ ⭐⭐⭐</option>
            <option value="2">2+ ⭐⭐</option>
          </select>

          <button id="reset-filters">Reset</button>
        </div>
        <div className="gallery-content"></div>
      </div>
    </section>
  );
}
