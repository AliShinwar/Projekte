<template>
    <div id="statusDesTeilnehmers">
        <div class="header">
            <span class="user-name">{{ benutzerName }}</span>
        </div>

        <div class="eingabe-containerBenutzerLoeschen">
            <h2>Status der Teilnehmer</h2>
            <div v-for="(user, index) in users" :key="index" class="form-group">
                <div class="label-text">{{ user.username }}</div>
                <div :class="['status-text']">
                    {{ user.status === 'passed' ? 'Bestanden' : 'Nicht Bestanden' }}
                </div>
                <button type="button" class="benutzerLoeschenBtn" @click="deleteUser(user.id)">Löschen</button>
            </div>
            <div>
                <button class="zurueckBtn" @click="navigateToAdmin">Zurück</button>
            </div>
        </div>

        <div>
            <button class="btn" id="btn" @click="navigateTo('HomeSeite')">zurück zur Homeseite</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            benutzerName: '',
            users: []
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                // Filter users to include only those with the role 'Schueler'
                this.users = response.data.filter(user => user.rolle === 'Schueler');
                // Fetch ergebnis and status for each user
                for (let user of this.users) {
                    try {
                        const ergebnisResponse = await axios.get(`http://localhost:3000/api/users_ergebnis/${user.username}`);
                        const userErgebnis = ergebnisResponse.data;
                        user.status = userErgebnis.status;
                    } catch (error) {
                        console.error(`Error fetching status for user ${user.username}:`, error);
                        user.status = 'Unknown';
                    }
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async deleteUser(id) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
                if (response.data.success) {
                    this.users = this.users.filter(user => user.id !== id);
                    alert('Benutzer erfolgreich gelöscht');
                } else {
                    alert('Fehler beim Löschen des Benutzers: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Ein Fehler ist beim Löschen des Benutzers aufgetreten.');
            }
        },
        navigateToAdmin() {
            this.$router.push('/Admin');
        },
        fetchUserName() {
            try {
                const username = localStorage.getItem('username');
                if (username) {
                    this.benutzerName = username;
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        },
        navigateTo(page) {
            this.$router.push('/');
        }
    },
    mounted() {
        this.fetchUsers();
        this.fetchUserName();
    }
};
</script>



<style scoped>
.bestanden {
    color: green;
}

/* Add your CSS styles here */
.status-text {
    margin-left: 10px;
    font-weight: bold;
}

.nicht-bestanden {
    color: red;
}

.header {
    position: absolute;
    top: 90px;
    right: 25px;
    display: flex;
    align-items: center;
    color: white;
}

.user-name {
    font-size: 18px;
    font-weight: bold;
}

body {
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.eingabe-containerBenutzerLoeschen {
    width: 500px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    height: auto;
    margin-top: 80px; 
}

.btn {
    position: fixed; 
    bottom: 30px; 
    left: 90px; 
    z-index: 1000; 
}

#btn {
    padding: 10px 30px ;
    font-size: 16px;
    background-color: #4815c2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.eingabe-containerBenutzerLoeschen h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Platz zwischen den Elementen */
    margin-bottom: 20px;
}

.label-text {
    color: #fff;
    font-size: 16px;
    margin-right: 20px;
    flex: 1; /* Füllt den verfügbaren Platz aus */
    text-align: left;
}

.status-text {
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 10px;
    width: 150px;
    text-align: center;
}

.status-text.bestanden {
    background-color: #28a745; /* Grün für bestanden */
    color: white;
}

.status-text.nicht-bestanden {
    background-color: #dc3545; /* Rot für nicht bestanden */
    color: white;
}

.benutzerLoeschenBtn {
    background-color: #dc3545;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.benutzerLoeschenBtn:hover {
    background-color: #c82333;
}

.zurueckBtn {
    background-color: #4815c2;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 150px;
    margin-top: 20px;
}

.zurueckBtn:hover {
    background-color: #370f9e;
}

.navbar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 120px;
}

.navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
}

.navbar li {
    margin: 0 10px;
}

.navbar li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
}

.navbar li a:hover {
    background-color: #4815c2;
}
</style>
