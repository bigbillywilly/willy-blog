import { useEffect, useState } from "react";

export default function FriendsFam() {
  const [items, setItems] = useState([]);

  async function loadItems() {
    const res = await fetch("http://localhost:8081/api/posts");
    const data = await res.json();
    const filtered = data.filter((post) => post.category === "friends");
    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setItems(filtered);
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <section>
      <h2>Friends & Family</h2>
      <div style={{ marginTop: "30px" }}>
        {items.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: "60px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                  }}
                />
              )}
              <h3 style={{ marginBottom: "10px", textAlign: "center" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#ccc", textAlign: "center", maxWidth: "500px" }}>
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
