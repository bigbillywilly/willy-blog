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
          I am a aspiring swe, avid reader and hiker, and number one fan of my girlfrend based in Salt Lake City, UT.
        </p>

        <p>
          I love hiking, climbing, and creating. I plan on becoming a library of knowledge for both finances and computer science.
        </p>

        <p>
          I have many aliases, but currently I go by Willy.
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
