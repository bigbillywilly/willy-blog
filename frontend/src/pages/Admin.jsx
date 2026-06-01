import { useState, useEffect } from "react";
import heic2any from "heic2any";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("thoughts");
  const [imageFiles, setImageFiles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState([]);

  const ADMIN_PASSWORD = "WillyLove123"; // Change this to your desired password

  // Load posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  async function loadPosts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
      const data = await res.json();
      // Sort by newest first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  }

  async function convertFileToDataUrl(file) {
    let fileToConvert = file;

    if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
      console.log("Converting HEIC to JPEG...");
      const convertedBlob = await heic2any({ blob: file });
      const convertedFile = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      fileToConvert = new File(
        [convertedFile],
        file.name.replace(/\.heic$/i, ".jpg"),
        { type: "image/jpeg" }
      );
      console.log("Conversion complete, new size:", convertedFile.size, "bytes");
    }

    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(fileToConvert);
    });
  }

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
      setPassword("");
    }
  }

  async function createPost() {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    if ((category === "hikes" || category === "friends") && imageFiles.length === 0) {
      alert("Please upload an image for this category");
      return;
    }

    let imageUrls = [];
    if (imageFiles.length > 0) {
      imageUrls = await Promise.all(imageFiles.map(async (file) => {
        const dataUrl = await convertFileToDataUrl(file);
        console.log("Image size (base64):", dataUrl.length, "bytes");
        return dataUrl;
      }));
    }

    const body = {
      title,
      content,
      category,
      imageUrl: imageUrls[0] ?? null,
      imageUrls: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
    };
    console.log("Sending post:", { title, content, category, imageUrlSize: imageUrls[0]?.length, imageCount: imageUrls.length });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Server error:", error);
      alert("Failed to create post: " + error);
      return;
    }

    setTitle("");
    setContent("");
    setCategory("thoughts");
    setImageFiles([]);
    alert("Post created!");
    loadPosts(); // Refresh post list
  }

  async function deletePost(id) {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Server error:", error);
      alert("Failed to delete post: " + error);
      return;
    }

    alert("Post deleted!");
    loadPosts(); // Refresh post list
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setTitle("");
    setContent("");
    setCategory("thoughts");
    setImageFiles([]);
    setPosts([]);
  }

  if (!isAuthenticated) {
    return (
      <section>
        <h2>Admin Login</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2>Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{ 
            background: "none", 
            border: "none", 
            color: "#0066cc", 
            cursor: "pointer",
            padding: 0,
            fontSize: "14px",
            textDecoration: "underline"
          }}
        >
          Logout
        </button>
      </div>

      <h3>Create New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="thoughts">Thoughts</option>
        <option value="projects">Projects</option>
        <option value="hikes">Hikes</option>
        <option value="friends">Friends & Family</option>
      </select>

      {(category === "hikes" || category === "friends") && (
        <div>
          <label>
            Upload Images (JPEG/PNG/HEIC):
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.heic"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const tooLarge = files.find((file) => file.size > 5 * 1024 * 1024);
                if (tooLarge) {
                  alert("One or more images are too large! Please use images under 5MB each.");
                  e.target.value = "";
                  setImageFiles([]);
                } else {
                  setImageFiles(files);
                }
              }}
            />
          </label>
          {imageFiles.length > 0 && (
            <p style={{ fontSize: "12px", color: "#666" }}>
              Selected: {imageFiles.map((file) => file.name).join(", ")}
            </p>
          )}
        </div>
      )}

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
      />

      <button onClick={createPost}>
        Create Post
      </button>

      <h3 style={{ marginTop: "60px", marginBottom: "30px" }}>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "20px",
                border: "1px solid #444",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#4a9eff" }}>{post.title}</h4>
                  <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#888" }}>
                    {post.category} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p style={{ margin: "0", fontSize: "14px", color: "#ccc", lineHeight: "1.5" }}>
                    {post.content.substring(0, 200)}
                    {post.content.length > 200 ? "..." : ""}
                  </p>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff6b6b",
                    cursor: "pointer",
                    fontSize: "20px",
                    padding: "0 10px 0 20px",
                    flexShrink: 0,
                  }}
                  title="Delete post"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
