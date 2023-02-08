const router = require("express").Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


// Create Product
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Update Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Get Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Get All Product
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        }
        else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Get All Product
router.get("/search", async (req, res) => {
    // q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));

    const query = req.query.q;
    try {
        let products;

        if (query) {
            products = await Product.find({

                $or: [{
                //     title: { $regex: query }
                // }, {
                    categories: { $in: [query] }
                }, {
                    color: { $in: [query] }
                }]
            });
        }
        // else {
        //     products = await Product.find();
        // }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;