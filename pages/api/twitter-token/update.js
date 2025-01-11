import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { tokens } = req.body;
  const filePath = path.join(process.cwd(), "twitter-token.json");
  fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
  res.status(200).json({ message: "Tokens updated successfully" });
}
