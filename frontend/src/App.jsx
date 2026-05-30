import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Hikes from "./pages/Hikes";
import FriendsFam from "./pages/FriendsFam";
import Thoughts from "./pages/Thoughts";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
          <h1>
            <Link to="/">Willy Ngo</Link>
          </h1>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/thoughts">Thoughts</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/hikes">Hikes</Link>
            <Link to="/friends">Friends & Family</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hikes" element={<Hikes />} />
          <Route path="/friends" element={<FriendsFam />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Link to="/admin" className="upload-button">Upload a Post</Link>

      <footer>
        <p>© 2026 William Ngo. All Rights Reserved.</p>
      </footer>
    </BrowserRouter>
  );
}
