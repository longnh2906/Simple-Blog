import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/post/" + slug
        );
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  const handleDelete = async() => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/${slug}`, {
        method: "DELETE",
      });
      if(res.ok){
        alert("Xoá thành công!");
        navigate("/posts");
      }
      else{
        alert("Xoá thất bại!");
      }
    }
    catch(err){
      console.error(err);
    }
  }
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("anonymous");

  const handleComment = async () => {
    if (!comment.trim()) return;
    const res = await fetch(`http://localhost:8080/api/post/${slug}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, updated.comment],
      }));
      setComment("");
    }
  };


  const { title, description, category } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>Comments</h4>
      <ul>
        {post.comments?.map((cmt, i) => (
          <li key={i}>
             {cmt.content}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Viết bình luận..."
      />
      <button onClick={handleComment}>Gửi</button>

      <p>{category}</p>
      <Link to={`/posts/${slug}/edit`}>
        <button>Edit</button>
      </Link>
      <br/>
      <button onClick={handleDelete} style={{ marginTop: 10 }}>Delete</button>
    </div>
  );
}
export default Post;
