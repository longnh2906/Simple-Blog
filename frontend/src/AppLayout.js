import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Posts from "./components/posts";
import Postslist from "./components/postlists";
import Post from "./components/post";
import { useState } from "react";
import Login from "./components/login";
import NoMatch from "./components/nomatch";
import Stats from "./components/stats";
import { useNavigate } from "react-router-dom";
import NewPost from "./components/newpost";
import Users from "./components/users";

function AppLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  function logOut() {
    setUser(null);
    navigate("/");
  }
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5, color: "blue" }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5, color: "blue" }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5, color: "blue" }}>
          About
        </Link>
        
        {user && (
          <Link to="/stats" style={{ padding: 5, color: "blue" }}>
            Stats
          </Link>
        )}
        {user && (
          <Link to="/newpost" style={{ padding: 5, color: "blue" }}>
            New Post
          </Link>
        )}

        {user && (
          <Link to="/users" style={{ padding: 5, color: "blue" }}>
            User
          </Link>
        )}

        {!user && (
          <Link to="/login" style={{ padding: 5, color: "blue" }}>
            Login
          </Link>
        )}

        {user && (
          <span onClick={logOut} style={{ padding: 5, color: "blue" }}>
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/posts" element={<Posts />}>
          <Route index element={<Postslist />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stats" element={<Stats user={user} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default AppLayout;
