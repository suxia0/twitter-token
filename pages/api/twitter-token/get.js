import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "twitter-token.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const tokens = JSON.parse(fileContent);
  res.status(200).json(tokens);
}
