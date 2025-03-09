document.getElementById('create-task-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duedate = document.getElementById('duedate').value;
    const status = document.getElementById('status').value;

    // Prepare the task data in JSON format
    const taskData = {
        title: title,
        description: description,
        duedate: new Date(duedate).toISOString(), // Convert to ISO format
        status: status,
    };
    console.log('Task data:', taskData); // Debugging step 1: Log task data

    try {
        // Send POST request to the backend API
        console.log('Sending POST request to backend API'); // Debugging step 2: Log before sending request
        const creatTaskAPI = 'https://task-management-mongodb-integrat-production.up.railway.app/tasks';
        const response = await fetch(creatTaskAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token if needed
            },
            body: JSON.stringify(taskData),
        });

        // Handle response
        console.log('Received response from backend API'); // Debugging step 3: Log after receiving response
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText); // Debugging step 4: Log error text
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        console.log('Task created successfully:', result); // Debugging step 5: Log success result

        // Display success message
        const messageElement = document.getElementById('success-message');
        messageElement.style.display = 'block';
        messageElement.textContent = 'Task created successfully!';
        messageElement.style.color = 'green';

        // Redirect to another page after a delay
        setTimeout(() => {
            window.location.href = '../TaskUser/renderUserTask.html'; // Change this to your desired redirect URL
        }, 2000); // Redirect after 2 seconds
    } catch (error) {
        console.error('Error:', error); // Debugging step 6: Log caught error
        alert('An error occurred while creating the task. Please try again.');
    }
});