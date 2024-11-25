const express = require('express');
const pool = require('../db'); // Datenbankverbindung
const jwt = require('jsonwebtoken'); // JWT-Token für Authentifizierung
const router = express.Router(); // Router-Objekt für die Routenverwaltung

// Benutzer erstellen
router.post('/users', async (req, res) => {
  const { username, email, passwort, rolle } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, passwort, rolle) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, passwort, rolle]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Alle Benutzer abrufen
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Benutzer löschen
router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userResult = await pool.query('SELECT username FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const username = userResult.rows[0].username;

    // Verknüpfte Ergebnisse löschen
    await pool.query('DELETE FROM users_ergebnis WHERE username = $1', [username]);
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Login-Endpunkt mit JWT-Token
router.post('/login', (req, res) => {
  console.log('Login route hit:', req.body);
  res.json({ success: true });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received:', username, password);

  try {
    // SQL-Abfrage ausführen
    const result = await pool.query('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', [username]);
    console.log('Database response:', result.rows);

    const user = result.rows[0];

    // Überprüfen, ob der Benutzer existiert und das Passwort korrekt ist
    if (user && user.passwort === password) {
      console.log('Login successful for user:', user.username);
      res.json({ success: true, role: user.rolle });
    } else {
      console.log('Invalid username or password');
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }
});




// Benutzerinfo basierend auf JWT-Token abrufen
router.get('/users/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [decodedToken.userId]);
    const user = result.rows[0];
    if (user) {
      res.json({ username: user.username, role: user.rolle });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fragen abrufen
router.get('/fragen', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fragen');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving questions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Frage erstellen
router.post('/fragen', async (req, res) => {
  const { fragestellung, antwort1, antwort2, antwort3, antwort4, richtigeAntwort } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO fragen (fragestellung, antwort1, antwort2, antwort3, antwort4, richtigeAntwort) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [fragestellung, antwort1, antwort2, antwort3, antwort4, richtigeAntwort]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Frage löschen
router.delete('/fragen/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM fragen WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount > 0) {
      res.json({ success: true, message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Question not found' });
    }
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Ergebnisse erstellen
router.post('/ergebnis', async (req, res) => {
  const { ergebnis, username, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users_ergebnis (ergebnis, username, status) VALUES ($1, $2, $3) RETURNING *',
      [ergebnis, username, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Alle Ergebnisse abrufen
router.get('/users_ergebnis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users_ergebnis');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving results:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ergebnisse eines Benutzers abrufen
router.get('/users_ergebnis/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const result = await pool.query('SELECT * FROM users_ergebnis WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error retrieving user results:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
