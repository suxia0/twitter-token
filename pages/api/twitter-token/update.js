import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'twitter-token.json');
        const { num, token } = req.body;

        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            // 更新或添加 num 和 token 的键值对
            data[num] = token;

            // 写入文件
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
            res.status(200).json({ success: true, message: 'Token updated successfully!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating token.', error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
