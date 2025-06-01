import { useState } from "react";

function Register(){
    const [formData, setFormData] = useState({username: "", password: ""});
    const [status, setStatus] = useState("");
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            const result = await res.json();
            if(res.status === 201){
                setStatus("Đăng kí thành công!");
            }
            else{
                setStatus(result.message || "Đăng kí thất bại");
            }
        }
        catch (err) {
            console.error(err);
            setStatus("Lỗi");
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Register New User</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br />
                <input type="text" name="username" onChange={handleChange} required /><br />
                <label>Password:</label><br />
                <input type="password" name="password" onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
                <p>{status}</p>
            </form>
        </div>
    )
}

export default Register;