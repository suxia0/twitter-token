import { useState, useEffect } from "react";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetch("/api/twitter-token/get")
        .then((res) => res.json())
        .then((data) => setTokens(data))
        .catch((err) => console.error("获取 tokens 失败:", err));
    }
  }, [loggedIn]);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("无效的凭证");
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
      body: JSON.stringify({ content: JSON.stringify(tokens) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("保存成功！");
        } else {
          alert("保存失败：" + data.message);
        }
      })
      .catch((error) => alert("网络错误：" + error.message));
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>登录</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>登录</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Token 管理</h1>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>Token</th>
            <th>操作</th>
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
                <button onClick={() => handleDelete(index)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>添加 Token</button>
      <button onClick={handleSave}>保存修改</button>
    </div>
  );
};

export default Admin;
