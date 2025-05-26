import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState("");
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

  const { title, description, category } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{category}</p>
    </div>
  );
}
export default Post;
