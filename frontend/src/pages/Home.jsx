import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const res = await fetch("http://localhost:8081/api/posts");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <section>
        <h2>About</h2>
        <p>
          I am a Computer Science student at the University of Utah.
        </p>

        <p>
          This website is a personal archive for my life, projects, writing,
          trips, photos, and anything else I want to remember.
        </p>
      </section>

      <section>
        <h2>Writing</h2>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
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
    </>
  );
}
