const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (api_key) => `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`; 


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Shango's Amazon Scraper API");
});

//GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.be/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET reviews array only
app.get('/reviews/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;    

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.be/dp/${productId}`);
        const productData = JSON.parse(response);

        const reviews = productData.reviews || [];

        res.json(reviews);
    } catch (error) {
        res.json(error);
    }
});

//GET Product Offers
app.get('/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.be/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com.be/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = app;