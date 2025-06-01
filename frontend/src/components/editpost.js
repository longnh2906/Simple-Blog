import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/post/${slug}`)
      .then(res => res.json())
      .then(data => reset(data))
      .catch(err => console.error("Error fetching post:", err));
  }, [slug, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Post updated successfully!");
        navigate(`/posts/${slug}`);
      } else {
        setMessage("Failed to update post.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred while updating post.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h2>Edit Post</h2>
      {message && <p>{message}</p>}

      <label>Title:</label>
      <input type="text" {...register("title", { required: true })} />
      {errors.title && <span>Title is required</span>}<br />

      <label>Description:</label>
      <input type="text" {...register("description", { required: true })} />
      {errors.description && <span>Description is required</span>}<br />

      <label>Category:</label>
      <select {...register("category", { required: true })}>
        <option value="Music">Music</option>
        <option value="Science">Science</option>
        <option value="Sports">Sports</option>
      </select>
      {errors.category && <span>Category is required</span>}<br />

      <button type="submit">Update Post</button>
    </form>
  );
}
export default EditPost;
