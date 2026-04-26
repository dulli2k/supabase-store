export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image_url} alt={product.name} />

      <div className="card-body">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>${Number(product.price).toFixed(2)}</h4>
        <p>{product.stock_quantity} in stock</p>
      </div>
    </div>
  );
}