import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许 POST 请求' });
  }

  try {
    const { username, password } = req.body;

    // 这里应该添加实际的用户验证逻辑
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: '用户名或密码错误' });
  } catch (error) {
    console.error('登录错误:', error);
    return res.status(500).json({ message: '服务器错误' });
  }
}
