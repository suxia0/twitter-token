import { useState, useEffect } from "react";

const Admin = () => {
  // 状态管理
  const [loggedIn, setLoggedIn] = useState(false); // 登录状态
  const [username, setUsername] = useState(""); // 用户名
  const [password, setPassword] = useState(""); // 密码
  const [error, setError] = useState(""); // 错误信息
  const [tokens, setTokens] = useState([]); // 存储 tokens 列表

  // 获取 tokens 列表
  useEffect(() => {
    if (loggedIn) {
      fetch("/api/twitter-token/get") // 请求获取 tokens
        .then((res) => res.json()) // 解析返回的 JSON 数据
        .then((data) => setTokens(data)); // 设置 tokens 数据
    }
  }, [loggedIn]); // 依赖于 loggedIn 状态，只有登录时才会触发请求

  // 登录处理
  const handleLogin = () => {
    if (username === "admin" && password === "admin") { // 检查用户名和密码
      setLoggedIn(true); // 设置为已登录状态
      setError(""); // 清空错误信息
    } else {
      setError("无效的凭证"); // 设置错误信息
    }
  };

  // 添加 token 处理
  const handleAdd = () => {
    const newToken = { num: `${tokens.length + 1}`, token: "" }; // 新建 token
    setTokens([...tokens, newToken]); // 更新 tokens 列表
  };

  // 删除 token 处理
  const handleDelete = (index) => {
    const updatedTokens = tokens.filter((_, i) => i !== index); // 根据索引删除指定的 token
    setTokens(updatedTokens); // 更新 tokens 列表
  };

  // 保存 token 处理
  const handleSave = () => {
    fetch("/api/twitter-token/update", {
      method: "POST", // 使用 POST 方法发送数据
      headers: { "Content-Type": "application/json" }, // 设置请求头为 JSON
      body: JSON.stringify({ tokens }), // 请求体中传递 tokens 数据
    }).then((res) => res.json()); // 解析返回的 JSON 数据
  };

  // 如果未登录，显示登录界面
  if (!loggedIn) {
    return (
      <div>
        <h1>登录</h1>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* 如果有错误信息，显示 */}
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // 更新用户名
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 更新密码
        />
        <button onClick={handleLogin}>登录</button> {/* 登录按钮 */}
      </div>
    );
  }

  // 登录后显示 token 管理界面
  return (
    <div>
      <h1>Token 管理</h1>
      <table>
        <thead>
          <tr>
            <th>编号</th> {/* 表头：编号 */}
            <th>Token</th> {/* 表头：Token */}
            <th>操作</th> {/* 表头：操作 */}
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => ( // 遍历 tokens 列表
            <tr key={index}>
              <td>{token.num}</td> {/* 显示 token 编号 */}
              <td>
                <input
                  value={token.token}
                  onChange={(e) => {
                    const updatedTokens = [...tokens]; // 创建 tokens 列表的副本
                    updatedTokens[index].token = e.target.value; // 更新指定 token 的值
                    setTokens(updatedTokens); // 更新 tokens 列表
                  }}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>删除</button> {/* 删除按钮 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAdd}>添加 Token</button> {/* 添加 token 按钮 */}
      <button onClick={handleSave}>保存修改</button> {/* 保存修改按钮 */}
    </div>
  );
};

export default Admin;
