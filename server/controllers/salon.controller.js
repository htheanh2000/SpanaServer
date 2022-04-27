
const mongoose = require('mongoose')
const db = require("../models");
const Salon = db.salon;
const Product = db.product;
const ObjectId = mongoose.Types.ObjectId;
exports.createSalon = (req, res) => {
    const { name, slogan, size, type, description, address, purpose, avatar } = req.body
    const salon = new Salon({
        name, slogan, size, type, description, address, purpose, avatar
    })

    salon.save((err, salon) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        else {
            return res.status(200).json({
                message: "Salon has been created successfully",
                data: salon
            })
        }
    })
}


exports.updateSalon = async (req, res) => {
    Salon.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
        .then(response => {
            return res.status(200).json({
                message: 'Updated salon successful',
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
    Salon.findById(id)
        .then(response => {
            return res.status(200).json({
                message: 'Get salon successful',
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

exports.getAllProductById = async (req, res) => {
    const { id } = req.params
    Product.aggregate([
        {
            $match: {
                owner: ObjectId(id)
            },
        },
        { $project: {  "__v": 0 , "owner": 0} },
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 },
                data: { $push: '$$ROOT' }
            },
        },
    ])
        .then(response => {
            return res.status(200).json({
                message: 'Get All Product successful',
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