import PageHeader from "../components/PageHeader.jsx";

export default function FavoritesPage() {
  return (
    <>
      <PageHeader title="Favorites" />

      <section className="favorites-page">
        <div className="container">
          <div id="favorites-items">
            <div className="empty-cart">
              <h2>You have no favorites yet</h2>
              <p>Add some products to see them here.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
