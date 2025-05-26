import { Outlet } from "react-router-dom";
function User() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>
      <Outlet />
    </div>
  );
}
export default User;
