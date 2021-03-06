
const mongoose =  require('mongoose')
const db = require("../models");
const User = db.user;
const ObjectId = mongoose.Types.ObjectId;

exports.getAll = (req, res) => {
  User.find({
    is_deleted: false
  })
    .select('_id username email roles')
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

exports.getById = async(req, res) => {
  const {id} = req.params
  const info =  await User.findById(id)
  .select('username email')
  .then((info) => info)
  const category = await User.aggregate([
      { $match : { _id : ObjectId(id)}} ,
      {$project: {"is_deleted" : 0, "__v" : 0 , "password": 0, "roles" : 0}},
    ])
    .then((category) => {
      return category
    })
    .catch((err) => {
      return []
    });
    console.log(info);
    res.status(200).json({
        username: info.username,
        email: info.email, 
        category
    })
}


// delete User
exports.deleteUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: {
      is_deleted: true
    }
  })
    .then(response => {
      return res.status(200).json({
        success: true,
        message: 'Deleted user successful',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    })

}

// update User
exports.updateUser = async (req, res) => {
  const updateUser = {
    username: req.body.username,
    email: req.body.email,
  }
  await User.findByIdAndUpdate(req.params.id, {
    $set: updateUser
  })
    .then(response => {
      return res.status(200).json({
        success: true,
        message: 'Updated user successful',
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });

    })
}




