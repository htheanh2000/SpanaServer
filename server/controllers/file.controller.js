const { uploadFile } = require("../services/s3");
const mongoose = require('mongoose')
const db = require("../models");
const Image = db.image;
const ObjectId = mongoose.Types.ObjectId;

const upload = async (req, res) => {
    try {
        if (req.files == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const file = req.files.file
        uploadFile(file.name, file.data, file.mimetype)
            .then((response) => {
                console.log(response);
                const img = new Image({
                    name: file.name,
                    link: response.Location
                })
                img.save((err, img) => {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }
                    else {
                        return res.status(200).send({
                            message: "Uploaded the file successfully: " + req.files.file.name,
                            data: img
                        });
                    }
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not upload the file: ${req.files.file.name}. ${err}`,
                });
            })
        // res.status(200).send({
        //     message: "Uploaded the file successfully: " + req.files.file.name,
        // });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        console.log("err", err);
        res.status(500).send({
            message: `Could not upload the file: ${req.files.file.name}. ${err}`,
        });
    }
};
const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};
const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
module.exports = {
    upload,
    getListFiles,
    download,
};