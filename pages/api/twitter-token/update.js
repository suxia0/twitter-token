const GITHUB_OWNER = 'suxa0'; // GitHub 用户名
const GITHUB_REPO = 'twitter-token'; // 仓库名
const GITHUB_FILE_PATH = 'twitter-token.json'; // 文件路径
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 从环境变量中读取 GitHub Token

// 处理 API 请求的函数
export default async function handler(req, res) {
    // 仅允许 POST 请求
    if (req.method === 'POST') {
        const { content } = req.body; // 获取前端传递的新内容（JSON 字符串）
        const encodedContent = Buffer.from(content).toString('base64'); // 将内容编码为 Base64

        // GitHub API 文件 URL
        const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

        try {
            // 第一步：获取文件的 SHA 值
            const getResponse = await fetch(fileUrl, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`, // 使用 GitHub Token 进行认证
                },
            });

            // 如果请求失败，返回 400 错误
            if (!getResponse.ok) {
                return res.status(400).json({ success: false, message: '获取文件详情失败。' });
            }

            // 解析返回的文件信息
            const fileData = await getResponse.json();
            const sha = fileData.sha; // 提取文件的 SHA 值

            // 第二步：更新文件内容
            const updateResponse = await fetch(fileUrl, {
                method: 'PUT', // 使用 PUT 方法更新文件
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`, // 使用 GitHub Token 进行认证
                    'Content-Type': 'application/json', // 设置请求体类型为 JSON
                },
                body: JSON.stringify({
                    message: '通过 API 更新 twitter-token.json', // 提交信息
                    content: encodedContent, // 新的文件内容（Base64 编码）
                    sha, // 必须包含文件的 SHA 值，用于更新文件
                }),
            });

            // 如果更新成功，返回成功响应
            if (updateResponse.ok) {
                return res.status(200).json({ success: true, message: '文件更新成功！' });
            } else {
                const errorData = await updateResponse.json(); // 获取错误信息
                return res.status(400).json({ success: false, message: errorData.message });
            }
        } catch (error) {
            // 如果发生异常，返回 500 错误
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        // 如果请求方法不是 POST，返回 405 错误
        res.status(405).json({ success: false, message: '方法不允许' });
    }
}
