import fs from "fs"; // 引入 fs 模块用于文件操作
import path from "path"; // 引入 path 模块用于路径处理

// 处理 API 请求的函数
export default function handler(req, res) {
  // 获取文件的完整路径，路径为当前工作目录下的 twitter-token.json 文件
  const filePath = path.join(process.cwd(), "twitter-token.json");

  // 读取文件内容，使用 'utf8' 编码方式
  const fileContent = fs.readFileSync(filePath, "utf8");

  // 将读取的文件内容解析为 JSON 对象
  const tokens = JSON.parse(fileContent);

  // 返回 HTTP 状态 200，响应内容为 tokens 数据
  res.status(200).json(tokens);
}
