const GITHUB_OWNER = 'suxa0'; // GitHub 用户名
const GITHUB_REPO = 'twitter-token'; // 仓库名
const GITHUB_FILE_PATH = 'twitter-token.json'; // 文件路径
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 从环境变量中读取 GitHub Token

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body; // 获取前端传递的新内容（JSON 字符串）
        if (!content) {
            return res.status(400).json({ success: false, message: '请求体中缺少 content 字段' });
        }

        const encodedContent = Buffer.from(content).toString('base64'); // 将内容编码为 Base64
        const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

        try {
            console.log("开始获取文件 SHA...");
            const getResponse = await fetch(fileUrl, {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            });

            if (!getResponse.ok) {
                console.error("获取文件 SHA 失败:", getResponse.status, getResponse.statusText);
                return res.status(400).json({ success: false, message: '获取文件详情失败' });
            }

            const fileData = await getResponse.json();
            const sha = fileData.sha; // 提取文件的 SHA 值

            console.log("获取文件 SHA 成功:", sha);

            console.log("开始更新文件内容...");
            const updateResponse = await fetch(fileUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: '通过 API 更新 twitter-token.json',
                    content: encodedContent,
                    sha,
                }),
            });

            if (updateResponse.ok) {
                console.log("文件更新成功");
                return res.status(200).json({ success: true, message: '文件更新成功！' });
            } else {
                const errorData = await updateResponse.json();
                console.error("文件更新失败:", errorData.message);
                return res.status(400).json({ success: false, message: errorData.message });
            }
        } catch (error) {
            console.error("API 调用异常:", error.message);
            return res.status(500).json({ success: false, message: `更新文件失败：${error.message}` });
        }
    } else {
        res.status(405).json({ success: false, message: '方法不允许' });
    }
}
