const handleSave = async (newData) => {
    try {
        const response = await fetch('/api/github/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: JSON.stringify(newData, null, 2), // 将新的 JSON 数据传递给后端
            }),
        });

        const result = await response.json();
        if (result.success) {
            alert('File updated successfully!');
        } else {
            alert('Failed to update file: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
};
