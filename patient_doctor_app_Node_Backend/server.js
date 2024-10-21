const express = require('express');
const session = require('express-session');
const admin = require('firebase-admin');
const cors = require('cors');
const bcrypt = require('bcrypt');
const serviceAccount = require('./database.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    console.log(token);
    try {
    const userRecord = await admin.auth().getUserByEmail(token).catch(async (error) => {
        if (error.code === 'auth/user-not-found') {
            return await admin.auth().createUser({ token, displayName: token });
        }
        throw error;
    });
    req.session.userId = userRecord.uid;
    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Session saving failed' });
        }
        return res.status(200).json({ message: 'Google login successful', userId: userRecord.uid });
    });
     
    } catch (error) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }
  });

app.post('/signin', async (req, res) => {
    const { token } = req.body;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log(decodedToken); 
      req.session.userId = decodedToken.uid;
      req.session.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'Session saving failed' });
        }
        return res.status(200).json({ message: 'Google login successful', userId: decodedToken.uid });
    });
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });



app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password, // here we can use       const hashedPassword = await bcrypt.hash(password, 10);   this kind of things.but use firebase It automatically hashing the passwords
        });
        res.status(201).json({ message: 'User created successfully', userId: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/auth/facebook', async (req, res) => {
    const { token } = req.body;
    console.log(token);
    try {
        const { id, email, name } = token;
        const userRecord = await admin.auth().getUserByEmail(email).catch(async (error) => {
            if (error.code === 'auth/user-not-found') {
                return await admin.auth().createUser({ email, displayName: name });
            }
            throw error;
        });
        req.session.userId = userRecord.uid;
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ error: 'Session saving failed' });
            }
            return res.status(200).json({ message: 'Facebook login successful', userId: userRecord.uid });
        });
    } catch (error) {
        res.status(401).json({ error: 'Facebook login failed' });
    }
});

app.get('/session-check', (req, res) => {
    if (req.session.userId) {
        console.log('Session check');
        res.status(200).send({ loggedIn: true });
    } else {
        res.status(401).send({ loggedIn: false });
    }
});

// Logout route to destroy session
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); 
      res.status(200).json({ message: 'Logout successful' });
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

