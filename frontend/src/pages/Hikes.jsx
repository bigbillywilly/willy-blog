import { useEffect, useState } from "react";
import PhotoSlideshow from "../components/PhotoSlideshow";
import { getPostImages } from "../utils/postImages";

export default function Hikes() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
    const data = await res.json();
    const filtered = data.filter((post) => post.category === "hikes");
    console.log("Hikes loaded:", filtered);
    filtered.forEach(item => {
      console.log(`Post "${item.title}" - imageUrl exists:`, !!item.imageUrl, "size:", item.imageUrl?.length);
    });
    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setItems(filtered);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <section>
      <h2>Hikes</h2>
      <div style={{ marginTop: "30px" }}>
        {items.length === 0 ? (
          <p>No hikes yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "60px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ marginBottom: "20px", textAlign: "left" }}>{item.title}</h3>
              <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
                <PhotoSlideshow images={getPostImages(item)} alt={item.title} />
                <p style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.6" }}>
                  {item.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
