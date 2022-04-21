require('dotenv').config()

const AWS = require('aws-sdk');

// Create S3 service object
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

// const params = {
//     Bucket:process.env.BUCKET_NAME,
// };

// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

const uploadFile = async (fileName,fileContent,mimetype) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
        ContentType: mimetype,
        ACL: 'public-read',
    };

    // Uploading files to the bucket
    return s3.upload(params).promise()
};

module.exports = {
    uploadFile
}