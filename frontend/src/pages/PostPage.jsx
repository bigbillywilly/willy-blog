import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PhotoSlideshow from "../components/PhotoSlideshow";
import { getPostImages } from "../utils/postImages";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function loadPost() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
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

      <PhotoSlideshow images={getPostImages(post)} alt={post.title} wrapperStyle={{ marginTop: "20px", marginBottom: "20px" }} imageStyle={{ width: "100%", maxWidth: "720px", height: "auto", aspectRatio: "1 / 1" }} />

      <div>
        {post.content}
      </div>
    </article>
  );
}
