import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heic2any from "heic2any";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("thoughts");
  const [imageFile, setImageFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "WillyLove123"; // Change this to your desired password

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

    if ((category === "hikes" || category === "friends") && !imageFile) {
      alert("Please upload an image for this category");
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      let fileToConvert = imageFile;
      
      // Convert HEIC to JPEG if needed
      if (imageFile.type === "image/heic" || imageFile.name.toLowerCase().endsWith(".heic")) {
        console.log("Converting HEIC to JPEG...");
        const convertedBlob = await heic2any({ blob: imageFile });
        fileToConvert = new File([convertedBlob], imageFile.name.replace(/\.heic$/i, ".jpg"), { type: "image/jpeg" });
        console.log("Conversion complete, new size:", convertedBlob.size, "bytes");
      }
      
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(fileToConvert);
      });
      console.log("Image size (base64):", imageUrl.length, "bytes");
    }

    const body = { title, content, category, imageUrl };
    console.log("Sending post:", { title, content, category, imageUrlSize: imageUrl?.length });

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
    setImageFile(null);
    alert("Post created!");
    navigate("/");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setTitle("");
    setContent("");
    setCategory("thoughts");
    setImageFile(null);
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
      <h2>Create Post</h2>
      <p style={{ fontSize: "12px", color: "#666" }}>
        <button 
          onClick={handleLogout}
          style={{ 
            background: "none", 
            border: "none", 
            color: "#0066cc", 
            cursor: "pointer",
            padding: 0,
            fontSize: "12px"
          }}
        >
          Logout
        </button>
      </p>

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
            Upload Image (JPEG/PNG/HEIC):
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.heic"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file && file.size > 5 * 1024 * 1024) {
                  alert("Image is too large! Please use an image under 5MB.");
                  e.target.value = "";
                  setImageFile(null);
                } else {
                  setImageFile(file);
                }
              }}
            />
          </label>
          {imageFile && <p style={{ fontSize: "12px", color: "#666" }}>Selected: {imageFile.name}</p>}
        </div>
      )}

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />

      <button onClick={createPost}>
        Create Post
      </button>
    </section>
  );
}
