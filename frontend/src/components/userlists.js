import { data, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Userslist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user.username}`}>
              <h3>{user.username}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Userslist;
