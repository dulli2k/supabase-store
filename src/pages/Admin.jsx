import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    stock_quantity: "",
  });

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  if (loading) return <p className="center">Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("id");
    setProducts(data || []);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function addProduct(e) {
    e.preventDefault();

    await supabase.from("products").insert([
      {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image_url: form.image_url,
        stock_quantity: Number(form.stock_quantity),
      },
    ]);

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
      stock_quantity: "",
    });

    fetchProducts();
  }

  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  return (
    <main className="admin">
      <h1>Admin Dashboard</h1>
      <p>Add and delete products directly from Supabase.</p>

      <form onSubmit={addProduct} className="admin-form">
        <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <input name="stock_quantity" type="number" placeholder="Stock" value={form.stock_quantity} onChange={handleChange} />

        <button type="submit">Add Product</button>
      </form>

      <section className="admin-list">
        {products.map((product) => (
          <div key={product.id} className="admin-item">
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </section>
    </main>
  );
}
