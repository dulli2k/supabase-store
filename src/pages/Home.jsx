import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .limit(6);

    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="hero">
        <h1>Shop the Latest Products</h1>
        <p>Browse products pulled live from Supabase.</p>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}