function openRegisterPage() {
    window.location.href = 'register.html';
}

function submitToDrive(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        game: formData.get('game'),
        team: formData.get('team')
    };

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        alert('Registration successful!');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again later.');
    });
}
