import fetch from 'node-fetch';

const GITHUB_OWNER = 'suxa0'; // GitHub 用户名
const GITHUB_REPO = 'twitter-token'; // 仓库名
const GITHUB_FILE_PATH = 'twitter-token.json'; // 文件路径
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 从环境变量中读取 GitHub Token

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body; // 前端传递的新内容（JSON 字符串）
        const encodedContent = Buffer.from(content).toString('base64'); // 将内容编码为 Base64

        const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

        try {
            // Step 1: 获取文件的 SHA 值
            const getResponse = await fetch(fileUrl, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            });

            if (!getResponse.ok) {
                return res.status(400).json({ success: false, message: 'Failed to fetch file details.' });
            }

            const fileData = await getResponse.json();
            const sha = fileData.sha; // 提取文件的 SHA 值

            // Step 2: 更新文件内容
            const updateResponse = await fetch(fileUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Update twitter-token.json via API', // 提交信息
                    content: encodedContent, // 新的文件内容
                    sha, // 必须包含文件的 SHA 值
                }),
            });

            if (updateResponse.ok) {
                return res.status(200).json({ success: true, message: 'File updated successfully!' });
            } else {
                const errorData = await updateResponse.json();
                return res.status(400).json({ success: false, message: errorData.message });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
