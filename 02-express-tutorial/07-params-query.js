const app = require('express')();
const port = 5000;

const { products, people} = require('./data');


app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1> <a href="/api/products">Products</a> ')
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image, desc, price } = product;
        return { id, name, image};
    });
    res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
    const {productID} = req.params
    const singleProduct = products.find((product) => product.id === Number(productID));
    
    if(!singleProduct){
        return res.status(404).send('Product does not exist');
    }
    res.json(singleProduct);
});

app.get('/api/v1/query', (req, res) => {
    const { search, limit } =req.query;
    let sortedProducts = [...products];

    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1){
        // res.status(200).send('No products matched your search')
    return res.status(200).json({
            success: true,
            data: [{
                search
            }]
        })
    }

    return res.status(200).json(sortedProducts);
});


app.listen(port, () => {
    console.log(`Server is listening on port 5000.....`);
});



