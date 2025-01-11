import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [
  { username: 'admin', password: '$2a$10$QzI5t5D8b5flZ5Z7WxCwR.x35vvnlwp1/M24e1leWgP2diVqVnSEe' } // 密码: password123
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    // 登录处理
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  if (req.method === 'PUT') {
    // 修改用户名或密码
    const { newUsername, newPassword } = req.body;
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const user = users.find(u => u.username === decoded.username);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // 更新用户名或密码
      if (newUsername) user.username = newUsername;
      if (newPassword) user.password = bcrypt.hashSync(newPassword, 10);

      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}