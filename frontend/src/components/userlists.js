import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Userslist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h3>{user.username}</h3>
          </li>
        ))}
      </ul>
      <p>Tổng số user: {users.length}</p>
    </div>
  );
}

export default Userslist;
