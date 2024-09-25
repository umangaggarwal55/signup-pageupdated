const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const country = req.body.country;

    const data = `Name: ${name}\nEmail: ${email}\nPassword: ${password}\nPhone: ${phone}\nGender: ${gender}\nCountry: ${country}\n\n`;
    fs.appendFile('user_data.txt', data, (err) => {
        if (err) throw err;
        console.log('Data saved to user_data.txt');
    });

    res.send('Signup successful!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
