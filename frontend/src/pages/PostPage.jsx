import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  async function loadPost() {
    try {
      const res = await fetch(`http://localhost:8081/api/posts/${id}`);
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
    return <div><p>Error: {error}</p><Link to="/">Back to home</Link></div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <Link to="/">← Back</Link>
      <h1>{post.title}</h1>

      <time>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>

      <div>
        {post.content}
      </div>
    </article>
  );
}
