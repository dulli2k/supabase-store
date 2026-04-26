export default function ProductCard({ product }) {
  const imageUrl = product.image_url?.includes("?")
    ? `${product.image_url}&auto=format&fit=crop&w=400&q=60`
    : `${product.image_url}?auto=format&fit=crop&w=400&q=60`;

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt={product.name}
        loading="lazy"
        width="400"
        height="260"
      />

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