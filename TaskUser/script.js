document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    // alert(`Token: ${token}`);

    // Check if the user is logged in
    if (!token) {
        window.location.href = '../user_authentication/signUP_signIN.html'; // Redirect to login page
        return;
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '../user_authentication/signUP_signIN.html';
    });

    // Create Task button
    const createTaskBtn = document.getElementById('create-task-btn');
    createTaskBtn.addEventListener('click', () => {
        window.location.href = '../createTask/create.html'; // Redirect to createTask page
    });

    try {
        // Fetch tasks from the backend
        const response = await fetch('http://localhost:8081/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        // Log the full response object
        // console.log('Full response:', response);
        // Alert the response status
        // alert(`Response status: ${response.status}`);

        if (!response.ok) {
            const statusCode = response.status;
            // alert(`Invalid token. Status code: ${statusCode}. Redirecting to login page...`);
            localStorage.removeItem('token');
            window.location.href = '../user_authentication/signUP_signIN.html';
            return;
        }

        const result = await response.json();
        // Log the result object
        // console.log('Result:', result);

        if (response.ok) {
            renderTasks(result); // Render tasks directly from result
        } else {
            alert(`Error: ${result.message || 'Failed to fetch tasks'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

function renderTasks(tasks) {
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; // Clear previous content

    if (!tasks || tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks found.</p>';
        return;
    }

    // Render each task
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><span class="status ${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span></p>
        `;
        tasksContainer.appendChild(taskElement);
    });
}