import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [twitterData, setTwitterData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTwitterData = async () => {
      const res = await fetch('/twitter.json');
      if (res.ok) {
        const data = await res.json();
        setTwitterData(data);
      } else {
        setError('Failed to load data');
      }
    };
    fetchTwitterData();
  }, []);

  const handleChange = (index, key, value) => {
    const updatedData = [...twitterData];
    updatedData[index][key] = value;
    setTwitterData(updatedData);
  };

  const handleSave = async () => {
    const res = await fetch('/api/save-twitter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: twitterData })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Data saved successfully');
    } else {
      setError(data.message || 'Failed to save data');
    }
  };

  return (
    <div>
      <h2>Twitter Data</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {twitterData.map((item, index) => (
            <tr key={index}>
              <td>{item.num}</td>
              <td>
                <input
                  type="text"
                  value={item.token}
                  onChange={(e) => handleChange(index, 'token', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}
