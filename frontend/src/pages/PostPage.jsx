import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function loadPost() {
    try {
      const res = await fetch(`https://willy-blog-production.up.railway.app/api/posts/${id}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadPost();
  }, [id]);

  if (error) {
    return <div><p>Error: {error}</p><button onClick={() => navigate(-1)}>Back</button></div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "#4a9eff", cursor: "pointer", padding: 0, fontSize: "16px" }}>← Back</button>
      <h1>{post.title}</h1>

      <time>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>

      <div>
        {post.content}
      </div>
    </article>
  );
}
