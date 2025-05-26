import { Outlet } from "react-router-dom";
function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blogs</h2>
      <Outlet />
    </div>
  );
}
export default Posts;
