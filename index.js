const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mockup data
const users = [
    { 
        id: 1, 
        fname: 'kanom', 
        lname: 'jeen',
        username: 'kanomjeen',
        email: 'kanomjeen@gmail.com',
        avatar: 'https://unsplash.com/photos/a-white-bowl-filled-with-noodles-and-vegetables-3JvXLmlaXtw',
    },
    { 
        id: 2, 
        fname: 'mango', 
        lname: 'sticky rice',
        username: 'mangostickyrice',
        email: 'mangostickyrice@gmail.com',
        avatar: 'https://unsplash.com/photos/yellow-and-green-vegetable-salad-on-white-ceramic-plate-kz6-Zi2hjwc',
    },

];


// Sample data
app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(201).json(user);
})

// Create a new user
app.post('/users', (req, res) => {
    const newUser = req.body
    users.push(newUser);
    res.status(201).json(newUser);
})

// Update an existing user
app.put('/users/:id', (req, res) => {
    const id =parseInt(req.params.id)
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    res.status(200).json(updatedUser)
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});