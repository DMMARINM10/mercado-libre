const { request, response } = require("express");
const { numberSeparation, arrayCategories } = require("../helpers/utils");

const searchUrl = process.env.MERCADO_LIBRE_SEARCH_RESULTS_ENDPOINT;
const itemUrl = process.env.MERCADO_LIBRE_ITEM_ENDPOINT;
const categoryUrl = process.env.MERCADO_LIBRE_CATEGORY_ENDPOINT;

const author = {
    name: "Danna",
    lastname: "Marin",
}

const getSearchResults = async (req = request, res = response) => {
    const { q: query } = req.query;

    if (!query) {
        return res.status(400).json({
            message: 'Search query should not be empty',
        });
    }

    try {
        const data = await fetch(`${searchUrl}?q=${query}&limit=4`);
        const jsonData = await data.json();
        const categories = arrayCategories(jsonData);
        const items = jsonData.results.map((item) => {
            const { id, 
                title, 
                currency_id: currency, 
                price: amount, 
                thumbnail: picture, 
                shipping, 
                condition, 
                seller 
            } = item;
            const { free_shipping } = shipping;
            const { nickname } = seller;
            const { integer, decimals } = numberSeparation(amount);
            return {
                id,
                title,
                price: {
                    currency,
                    amount: integer,
                    decimals,
                },
                picture,
                free_shipping,
                condition,
                seller: nickname,
            }
        })
        res.json({
            author,
            categories,
            items,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal Server Error',
            error
        })
    }
};

const getItemCategories = async(categoryId) => {
    const data = await fetch(`${categoryUrl}/${categoryId}`)
    const jsonData = await data.json();
    if (jsonData.error) {
        return res.status(404).json({
            message: 'Resource not found'
        });
    }
    const { path_from_root } = jsonData;
    const categories = path_from_root.map((path) => path.name)
    return categories
}

const getItem = (req = request, res = response) => {
    const { id } = req.params;
    const productUrl = `${itemUrl}/${id}`;

    const fetchItem = fetch(`${productUrl}`).then(response => response.json());
    const fetchItemDescription = fetch(`${productUrl}/description`).then(response => response.json());
    
    Promise.all([fetchItem, fetchItemDescription])
    .then(async([dataItem, dataDescription]) => {
        if (dataItem.error || dataDescription.error) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        try {
            const { id,
                title,
                price,
                currency_id: currency,
                pictures,
                condition,
                shipping,
                initial_quantity: sold_quantity,
                category_id: categoryId,
            } = dataItem;
            const { plain_text: description } = dataDescription;
            const { integer, decimals } = numberSeparation(price);
            const { secure_url: picture } = pictures[0];
            const { free_shipping } = shipping;
            const categories = await getItemCategories(categoryId);
            res.json({
                author,
                item: {
                    id,
                    title,
                    price: {
                        currency,
                        amount: integer,
                        decimals: decimals,
                    },
                    picture,
                    condition,
                    free_shipping,
                    sold_quantity,
                    description,
                    categories,
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'Internal Server Error',
                error
            })
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({
            msg: 'Internal Server Error',
            error
        })
    });

};

module.exports = {
    getItem,
    getSearchResults,
}