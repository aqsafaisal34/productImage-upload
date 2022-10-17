import express, { request } from "express"
import cors from "cors"
import mongoose from 'mongoose';
import fs from 'fs';
import admin from "firebase-admin";
import { stringToHash } from "bcrypt-inzi";


https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
    "type": "service_account",
    "project_id": "e-commerce-c21d9",
    "private_key_id": "e2dace9837e6cbcbba106ac411561c36ffd7dc8a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCmhHU0x1d7u12\nXHPl0H82shIEqEaUehVm2NJmBB7Q7bOjzgul7cQpu/XlWERv+pSAf9P4J+LIvMcP\nT0epMrcLS/P4MxPPrwBCgiPcb4+xWuP6/cN9u4Hh6rSX1rbS6/JU6TCRumFDbJKQ\n2rJCxxDF6w4FLsCsLI2VInksJmkKaWMxPrl6HtffatXOaS2qD6fu1kbwFCh9pXxu\n+POn69zIqHdPeKr9I2ODediQE3M1L/f9psGBKzkzPnwezroUw5H8c4/Q58GAM3dA\nJg5jM5qoiFf+IvEpdbOjKGhGPHMZQcvbrWqYPJS27M3Nd/OBbyf8suN/QNmsSR+R\nklLz5+9jAgMBAAECggEANnlde3d7dYOACo13zgGu0rdHLvGSDFcebZNNVkxZ+f9I\nNZbkkNa9fjdE7qXmRnhdIJln00QLCkk56dG2DCmLrshcq4JUzeK9jmCSvE6oaSu5\nvNVTZ3tZMM38LrLmq6VryRQbyfdj6bVXU+A8XVAPJHAXlSDQw4GXQoOLau33ond/\nuqs7ZqkQ/LAcLFqjAFwBOEIE7UrL1P5XmdKrNDEV4GWqRgfYvb6pLRX5aGSULkQd\nqAsZ76HD6Z2eYxeueo0uaWgMHnNIJZ4YKzefR1L1IWgprT/p+MiMfn8Up6oGnYrK\ndMFVqsJtxtZOWDxsLQbmRsueFMxkqIeFbpjo11qtrQKBgQDpsPxB/aDnXr9iSyMO\nIsPddzQzGhlWwhnVLz8GXcJIS+C3Ivp0SlCsbuJNju00vhRi6nk+wiWtIU2SId8r\nVtRswNGq7ao5NbEQVwB4th8qskIm6kDVfepUN15EPYN++005qnVpE0fc9m6boWh3\n3BqaV+HcFp2H5s2budPU1Yc0XQKBgQDVLc3D7EKN95vGgcbHDQOG7KpF6eynYk4L\nHjtlLj/n9Kz6EVmfGpify0tk4EJVSGfA3Iy+Hmk1bAtGF0faV+6zDM8er8yHS3Kr\n4gMW6lC4jC6UacHXrLWWfADo2aNMqd7GPAW6uj1HsAaQBYy19jyYrAoVR9MZjOGK\n/+vEuyl2vwKBgQCYuQ/C2MxlKOiOhmg8fr/eZl743p+csXFMf3oC4RdtRBlx1iwz\n/7VFW5oN8dBX3blZA7+FIkCZKuCVFgnROwfMox7jRDsw9EPpV9J5ERzBPIo7AHCq\nlYWk0CKNGl5riDRp8VqV9wHKCEs07oFlg7TnFXQH78e330CT+xfTSlD4CQKBgF4T\n2qzOBQkV7t8Jwqlxas8Ofo5gD5pG3d42N0wNvxIkfnnVUlHOsPBEDT+1YFC2pWMN\ncectEI0M42TJPWJ0T9kgm/8U4hQLDc4g7fAc9AadhqjkizEc/P4uN1CLS2+3v6KI\nNpcTPZv3aM4CRPjAdDmEIucFTXoHHDn1exzU5BWNAoGBANI3AuCm1gofVNbYoEAP\nAfHpkjm3mtzcSezpIjTyAdlu8zwx7ek2mWMOAK49ji70nYncv675mxj5+/eGZA8F\n3uXDQ3AZZc0s8rQluChup5HQfRjHLYO8wG3c4s6mBxGyYZHOq3yHcH67LniZBmtj\n2RXMs0zA3EshcA92WsL/gkLh\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xhvmu@e-commerce-c21d9.iam.gserviceaccount.com",
    "client_id": "117232524921390836693",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xhvmu%40e-commerce-c21d9.iam.gserviceaccount.com"

};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:  "https://e-commerce-c21d9.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://e-commerce-c21d9.appspot.com");



//==============================================
import multer from 'multer';
const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })

//==============================================





const dbURI = process.env.MONGODBURI || 'mongodb+srv://abc:abc@cluster0.iunhwh0.mongodb.net/Product?retryWrites=true&w=majority';
const port = process.env.PORT || 5001;


const app = express();
app.use(express.json()); // parsing body


app.use(cors({
    origin: ['http://localhost:3000',https://super-cool-site-by-aqsay-faisal34-gmail-com-64ff6.netlify.app/, "*"],
    credentials: true
}));

const userSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },

    createdOn: { type: Date, default: Date.now },
});
const userModel = mongoose.model('Users', userSchema);



app.post("/signup", upload.any(), (req, res) => {

    let body = req.body;

    // console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

    if (!body.name
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "name": "John",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        // check if user already exist // query email user
                        userModel.findOne({ email: body.email }, (err, user) => {
                            if (!err) {
                                console.log("user: ", user);

                                if (user) { // user already exist
                                    console.log("user already exist: ", user);
                                    res.status(400).send({ message: "user already exist,, please try a different email" });
                                    return;

                                } else { // user not already exist

                                    stringToHash(body.password).then(hashString => {

                                        userModel.create({
                                            name: body.name,
                                            email: body.email.toLowerCase(),
                                            password: hashString,
                                            profilePicture: urlData[0]
                                        },
                                            (err, result) => {
                                                if (!err) {
                                                    console.log("data saved: ", result);
                                                    res.status(201).send({
                                                        message: "user is created",
                                                        data: {
                                                            name: body.name,
                                                            email: body.email.toLowerCase(),
                                                            profilePicture: urlData[0]
                                                        }
                                                    });
                                                } else {
                                                    console.log("db error: ", err);
                                                    res.status(500).send({ message: "internal server error" });
                                                }
                                            });
                                    })

                                }
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "db error in query" });
                                return;
                            }
                        })


                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });








});


app.get("/users", async (req, res) => {
    try {
        let users = await userModel.find({}).exec();
        console.log("all user : ", users);

        res.send({
            message: "all users",
            data: users
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})








/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
