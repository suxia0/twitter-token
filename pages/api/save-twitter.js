import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;

    const filePath = path.join(process.cwd(), 'twitter.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: 'Data saved successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
