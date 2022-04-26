const db = require("../models");
const Product = db.product;

exports.createProduct = (req, res) => {
    const { owner, name, type, description, price, coupon, image } = req.body
    const product = new Product({
        owner, name, type, description, price, coupon, image
    })
    console.log("product",product);
    console.log("product",owner);
    product.save((err, data) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        else {
            return res.status(200).json({
                message: "Product has been created successfully",
                data: data
            })
        }
    })
}

exports.update = async (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then(response => {
            return res.status(200).json({
                message: 'Updated product successful',
                data: response
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Server error. Please try again.',
                error: err.message,
            });

        })
}

exports.getById = async (req, res) => {
    const { id } = req.params
    Product.findById(id)
        .then(response => {
            return res.status(200).json({
                message: 'successful',
                data: response
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Server error. Please try again.',
                error: err.message,
            });

        })
}
