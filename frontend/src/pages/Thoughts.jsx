import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Thoughts() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const res = await fetch("https://willy-blog-production.up.railway.app/api/posts");
    const data = await res.json();
    const filtered = data.filter((post) => post.category === "thoughts");
    setPosts(filtered);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section>
      <h2>Thoughts</h2>

      {posts.length === 0 ? (
        <p>No thoughts yet.</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "15px" }}>
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
