import React from 'react'

const Admin = () => {
    const handleSave = async (newData) => {
        try {
            const response = await fetch('/api/github/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: JSON.stringify(newData, null, 2),
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

    return (
        <div>
            <h1>Admin Page</h1>
            {/* 在这里添加你的管理页面内容，并在需要时调用 handleSave */}
        </div>
    )
}

export default Admin
