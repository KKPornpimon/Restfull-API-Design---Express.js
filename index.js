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

const products = [
    {id: 1, name: "Laptop", price: 39999},
    {id: 2, name: "Phone", price: 19999},
]

const orders = [
    {id: 1, userId: 1, productId: [1,2]},
    {id: 2, userId: 2, productId: [1]},
];


// Sample data
app.get('/users', (req, res) => {
    res.status(200).json(users);
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
    const id = parseInt(req.params.id)
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    res.status(200).json(users[index]);
})

// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const removed = users.splice(index, 1);
    if (removed.length === 0) return res.status(500).json({ message: 'Failed to delete user' });
    res.status(204).json({ message: 'User deleted successfully' });
})

//============================================
// Products endpoints
app.get('/products', (req, res) => {
    res.status(200).json(products);
})

// Products by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const product = products.find(p => p.id === id)
    if (!product) return res.status(404).json({ message: 'Product not found' });
    console.log(product)
    res.status(200).json(product)
})

// Create a new product
app.post('/products', (req, res) => {
    const newProduct = req.body
    products.push(newProduct)
    res.status(201).json(newProduct)
})

// Update an existing product
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    const updateProduct = { ...products[index], ...req.body}
    products[index] = updateProduct
    res.status(200).json(products[index])
})

// Delete a product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    const removed = products.splice(index, 1)
    console.log(removed)
    res.status(204).json({ message: 'Product deleted successfully' });
})

//===============================================
// Orders endpoints
// Get all orders
app.get('/orders', (req, res) => {
    // show details of orders, constructing
    const detailOrders = orders.map(order => {
        const user = users.find(u => u.id === order.userId)
        const product = order.productId.map(pid => products.find(p => p.id === pid))
        return {
            id: order.id,
            user,
            products: product
        }
    })
    res.status(200).json(detailOrders);
})

// Get order by ID
app.get('/orders/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const order = orders.find(o => o.id === id)
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const user = users.find(u => u.id === order.userId)
    const productsInOrder = order.productId.map(pid => products.find(p => p.id === pid))
    return res.status(200).json({
        id: order.id,
        user,
        products: productsInOrder
    });
})

// Create a new order
app.post('/orders', (req, res) => {
    const newOrder = req.body
    res.status(201).json(newOrder);
})

// Update an existing order
app.put('/orders/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = orders.findIndex(o => o.id === id)
    if (index === -1) return res.status(404).json({ message: 'Order not found' });
    const updatedOrder = { ...orders[index], ...req.body }
    orders[index] = updatedOrder
    res.status(200).json(orders[index])
})

// Delete an order
app.delete('/orders/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = orders.findIndex(o => o.id === id)
    if (index === -1) return res.status(404).json({ message: 'Order not found' });
    const removed = orders.splice(index, 1)
    if (removed.length === 0) return res.status(500).json({ message: 'Failed to delete order' });
    res.status(204).json({ message: 'Order deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});