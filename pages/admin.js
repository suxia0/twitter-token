import { useState, useEffect } from "react";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState([]);

  // Fetch tokens from API
  useEffect(() => {
    if (loggedIn) {
      fetch("/api/twitter-token/get")
        .then((res) => res.json())
        .then((data) => setTokens(data));
    }
  }, [loggedIn]);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleAdd = () => {
    const newToken = { num: `${tokens.length + 1}`, token: "" };
    setTokens([...tokens, newToken]);
  };

  const handleDelete = (index) => {
    const updatedTokens = tokens.filter((_, i) => i !== index);
    setTokens(updatedTokens);
  };

  const handleSave = () => {
    fetch("/api/twitter-token/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens }),
    }).then((res) => res.json());
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Token Management</h1>
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>Token</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.num}</td>
              <td>
                <input
                  value={token.token}
                  onChange={(e) => {
                    const updatedTokens = [...tokens];
                    updatedTokens[index].token = e.target.value;
                    setTokens(updatedTokens);
                  }}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>Add Token</button>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default Admin;
