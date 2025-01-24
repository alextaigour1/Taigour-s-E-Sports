document.addEventListener('DOMContentLoaded', () => {
    // Login feature
    const loginForm = document.getElementById('login-form');
    const adminPanel = document.querySelectorAll('.admin-panel');
    const logoutButton = document.getElementById('logout-button');
    const username = 'Alex Taigour';
    const password = 'TAIGOURS';

    // Hide logout button initially
    logoutButton.style.display = 'none';

    // Hide admin panels initially
    adminPanel.forEach(panel => panel.style.display = 'none');

    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        loginForm.style.display = 'none';
        adminPanel.forEach(panel => panel.style.display = 'block');
        logoutButton.style.display = 'block'; // Show logout button if logged in
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputUsername = document.getElementById('username').value;
        const inputPassword = document.getElementById('password').value;

        if (inputUsername === username && inputPassword === password) {
            sessionStorage.setItem('isLoggedIn', 'true');
            loginForm.style.display = 'none';
            adminPanel.forEach(panel => panel.style.display = 'block');
            logoutButton.style.display = 'block'; // Show logout button on successful login
        } else {
            alert('Invalid username or password');
        }
    });

    // Logout feature
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isLoggedIn');
        location.reload();
    });

    // Leaderboard Management
    const teamForm = document.getElementById('team-form');
    const adminTable = document.getElementById('admin-table');
    let teams = JSON.parse(localStorage.getItem('teams')) || [];

    teamForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const team = {
            id: Date.now(),
            logo: document.getElementById('team-logo').value,
            name: document.getElementById('team-name').value,
            members: document.getElementById('team-members').value,
            kills: document.getElementById('total-kills').value,
            captain: document.getElementById('captain').value
        };
        teams.push(team);
        localStorage.setItem('teams', JSON.stringify(teams));
        renderTeams();
        teamForm.reset();
    });

    function renderTeams() {
        adminTable.innerHTML = `
            <tr>
                <th>S.No</th>
                <th>Team Logo</th>
                <th>Team Name</th>
                <th>Members</th>
                <th>Total Kills</th>
                <th>Captain</th>
                <th>Actions</th>
            </tr>
        `;
        teams.forEach((team, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${team.logo}" alt="Team Logo"></td>
                <td>${team.name}</td>
                <td>${team.members}</td>
                <td>${team.kills}</td>
                <td>${team.captain}</td>
                <td>
                    <button onclick="editTeam(${team.id})">Edit</button>
                    <button onclick="deleteTeam(${team.id})">Delete</button>
                </td>
            `;
            adminTable.appendChild(row);
        });
    }

    window.editTeam = (id) => {
        const team = teams.find(t => t.id === id);
        document.getElementById('team-id').value = team.id;
        document.getElementById('team-logo').value = team.logo;
        document.getElementById('team-name').value = team.name;
        document.getElementById('team-members').value = team.members;
        document.getElementById('total-kills').value = team.kills;
        document.getElementById('captain').value = team.captain;
    };

    window.deleteTeam = (id) => {
        teams = teams.filter(t => t.id !== id);
        localStorage.setItem('teams', JSON.stringify(teams));
        renderTeams();
    };

    renderTeams();

    // Schedule Management
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleTable = document.getElementById('schedule-table');
    let events = JSON.parse(localStorage.getItem('events')) || [];

    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const event = {
            id: Date.now(),
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            name: document.getElementById('event-name').value
        };
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        renderEvents();
        scheduleForm.reset();
    });

    function renderEvents() {
        scheduleTable.innerHTML = `
            <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Time</th>
                <th>Event Name</th>
                <th>Actions</th>
            </tr>
        `;
        events.forEach((event, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${event.date}</td>
                <td>${event.time}</td>
                <td>${event.name}</td>
                <td>
                    <button onclick="editEvent(${event.id})">Edit</button>
                    <button onclick="deleteEvent(${event.id})">Delete</button>
                </td>
            `;
            scheduleTable.appendChild(row);
        });
    }

    window.editEvent = (id) => {
        const event = events.find(e => e.id === id);
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-time').value = event.time;
        document.getElementById('event-name').value = event.name;
    };

    window.deleteEvent = (id) => {
        events = events.filter(e => e.id !== id);
        localStorage.setItem('events', JSON.stringify(events));
        renderEvents();
    };

    renderEvents();

    // PUBG Event Card Management
    const pubgEventCardForm = document.getElementById('pubg-event-card-form');
    const pubgEventCardTable = document.getElementById('pubg-event-card-table');
    let pubgEventCards = JSON.parse(localStorage.getItem('pubgEventCards')) || [];

    pubgEventCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventCard = {
            id: Date.now(),
            capacity: document.getElementById('pubg-event-card-capacity').value,
            map: document.getElementById('pubg-event-card-map').value,
            name: document.getElementById('pubg-event-card-name').value,
            time: document.getElementById('pubg-event-card-time').value,
            prizePool: document.getElementById('pubg-event-card-prize-pool').value,
            others: document.getElementById('pubg-event-card-others').value,
            participateLink: document.getElementById('pubg-event-card-participate-link').value
        };
        pubgEventCards.push(eventCard);
        localStorage.setItem('pubgEventCards', JSON.stringify(pubgEventCards));
        renderPubgEventCards();
        pubgEventCardForm.reset();
    });

    function renderPubgEventCards() {
        pubgEventCardTable.innerHTML = `
            <tr>
                <th>S.No</th>
                <th>Capacity</th>
                <th>Map</th>
                <th>Event Name</th>
                <th>Time</th>
                <th>Prize Pool</th>
                <th>Others</th>
                <th>Participate Link</th>
                <th>Actions</th>
            </tr>
        `;
        pubgEventCards.forEach((eventCard, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${eventCard.capacity}</td>
                <td>${eventCard.map}</td>
                <td>${eventCard.name}</td>
                <td>${eventCard.time}</td>
                <td>${eventCard.prizePool}</td>
                <td>${eventCard.others}</td>
                <td><a href="${eventCard.participateLink}" target="_blank">Link</a></td>
                <td>
                    <button onclick="editPubgEventCard(${eventCard.id})">Edit</button>
                    <button onclick="deletePubgEventCard(${eventCard.id})">Delete</button>
                </td>
            `;
            pubgEventCardTable.appendChild(row);
        });
    }

    window.editPubgEventCard = (id) => {
        const eventCard = pubgEventCards.find(e => e.id === id);
        document.getElementById('pubg-event-card-id').value = eventCard.id;
        document.getElementById('pubg-event-card-capacity').value = eventCard.capacity;
        document.getElementById('pubg-event-card-map').value = eventCard.map;
        document.getElementById('pubg-event-card-name').value = eventCard.name;
        document.getElementById('pubg-event-card-time').value = eventCard.time;
        document.getElementById('pubg-event-card-prize-pool').value = eventCard.prizePool;
        document.getElementById('pubg-event-card-others').value = eventCard.others;
        document.getElementById('pubg-event-card-participate-link').value = eventCard.participateLink;
    };

    window.deletePubgEventCard = (id) => {
        pubgEventCards = pubgEventCards.filter(e => e.id !== id);
        localStorage.setItem('pubgEventCards', JSON.stringify(pubgEventCards));
        renderPubgEventCards();
    };

    renderPubgEventCards();

    // Free Fire Event Card Management
    const freefireEventCardForm = document.getElementById('freefire-event-card-form');
    const freefireEventCardTable = document.getElementById('freefire-event-card-table');
    let freefireEventCards = JSON.parse(localStorage.getItem('freefireEventCards')) || [];

    freefireEventCardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventCard = {
            id: Date.now(),
            capacity: document.getElementById('freefire-event-card-capacity').value,
            map: document.getElementById('freefire-event-card-map').value,
            name: document.getElementById('freefire-event-card-name').value,
            time: document.getElementById('freefire-event-card-time').value,
            prizePool: document.getElementById('freefire-event-card-prize-pool').value,
            others: document.getElementById('freefire-event-card-others').value,
            participateLink: document.getElementById('freefire-event-card-participate-link').value
        };
        freefireEventCards.push(eventCard);
        localStorage.setItem('freefireEventCards', JSON.stringify(freefireEventCards));
        renderFreefireEventCards();
        freefireEventCardForm.reset();
    });

    function renderFreefireEventCards() {
        freefireEventCardTable.innerHTML = `
            <tr>
                <th>S.No</th>
                <th>Capacity</th>
                <th>Map</th>
                <th>Event Name</th>
                <th>Time</th>
                <th>Prize Pool</th>
                <th>Others</th>
                <th>Participate Link</th>
                <th>Actions</th>
            </tr>
        `;
        freefireEventCards.forEach((eventCard, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${eventCard.capacity}</td>
                <td>${eventCard.map}</td>
                <td>${eventCard.name}</td>
                <td>${eventCard.time}</td>
                <td>${eventCard.prizePool}</td>
                <td>${eventCard.others}</td>
                <td><a href="${eventCard.participateLink}" target="_blank">Link</a></td>
                <td>
                    <button onclick="editFreefireEventCard(${eventCard.id})">Edit</button>
                    <button onclick="deleteFreefireEventCard(${eventCard.id})">Delete</button>
                </td>
            `;
            freefireEventCardTable.appendChild(row);
        });
    }

    window.editFreefireEventCard = (id) => {
        const eventCard = freefireEventCards.find(e => e.id === id);
        document.getElementById('freefire-event-card-id').value = eventCard.id;
        document.getElementById('freefire-event-card-capacity').value = eventCard.capacity;
        document.getElementById('freefire-event-card-map').value = eventCard.map;
        document.getElementById('freefire-event-card-name').value = eventCard.name;
        document.getElementById('freefire-event-card-time').value = eventCard.time;
        document.getElementById('freefire-event-card-prize-pool').value = eventCard.prizePool;
        document.getElementById('freefire-event-card-others').value = eventCard.others;
        document.getElementById('freefire-event-card-participate-link').value = eventCard.participateLink;
    };

    window.deleteFreefireEventCard = (id) => {
        freefireEventCards = freefireEventCards.filter(e => e.id !== id);
        localStorage.setItem('freefireEventCards', JSON.stringify(freefireEventCards));
        renderFreefireEventCards();
    };

    renderFreefireEventCards();
});
