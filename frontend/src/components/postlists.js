import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Postslist() {
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
    fetch("http://localhost:8080/api/count")
      .then((res) => res.json())
      .then((count) => setPostCount(count.numberOfPosts));
  }, []);
  const handleSearch = () => {
    fetch(`http://localhost:8080/api/search/term?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setPostCount(data.length);
      });
  };
  return (
    <div>
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <span>Number of posts: {postCount}</span>
    </div>
  );
}
export default Postslist;
