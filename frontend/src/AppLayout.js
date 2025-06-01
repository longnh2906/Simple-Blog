import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Posts from "./components/posts";
import Postslist from "./components/postlists";
import Post from "./components/post";
import Login from "./components/login";
import NoMatch from "./components/nomatch";
import Stats from "./components/stats";
import NewPost from "./components/newpost";
import Users from "./components/users";
import Userslist from "./components/userlists";
import EditPost from "./components/editpost";
import Register from "./components/register";


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
        <Link to="/about" style={{ padding: 5, color: "blue" }}>
          About
        </Link>
        <Link to="/posts" style={{ padding: 5, color: "blue" }}>
          Posts
        </Link>
        {user && (
          <Link to="/newpost" style={{ padding: 5, color: "blue" }}>
            New Post
          </Link>
        )}
        {user && (
          <Link to="/stats" style={{ padding: 5, color: "blue" }}>
            Stats
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
        {!user && (
          <Link to="/register" style={{ padding: 5, color: "blue" }}>
            Register
          </Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/posts" element={<Posts />}>
          <Route index element={<Postslist />} />
          <Route path=":slug" element={<Post />} />
          <Route path=":slug/edit" element={<EditPost />} /> 
        </Route>
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/stats" element={<Stats user={user} />} />
        <Route path="/users" element={<Users />}>
          <Route index element={<Userslist />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default AppLayout;
