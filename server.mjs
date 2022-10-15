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
    "private_key_id": "180bfb1376afd995254aaa1838834785e5fc0d75",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDXIII739s/AcLu\nD8BBSC4AMLxkGkHQYfH0+b1zXdbZuhiI52bUDXUENvtF4R5sso/LAUqghVzOfbK9\nRG7A0xgtVTCnheTfUna0Gi2+gmcUgU5x1ieWeV3S1CHXMz3ZJ1KnJVWRAZMVSej6\n2z5XXTwhQp5a/UGoFSC9NJZLaQBTOvXDAkWSzh5R7lFGuZ6i0sv1mj91/wcgrmG5\nZsK/zgmzMNjafL2HpliWeiTWqFO8gFDFhWVxJOuNIY4rJBEyEAz+ANc/8QSMsxnA\nQZsDoCn+K6AZCULtJJTNZ3oy0jrskvvwrewGIETaOIfkD9MYj2szH1h8cjxGO7is\nSeFiSxvTAgMBAAECggEAB0mGn9iZaKz6mW3XKV70j/UWrJ1nFVP8Cjxbeoj3OjDf\nm+OazBwYlqf2IwvZJ/10eX/1szJRTn1bjKXAyq9b5k04dLRIaHg2pSst2YI5U6x9\np8WFWceKshWVf+Cwe6alWhwdpefTv6jdR4Idvn/eBZJoItTpYHQ2w7IAVVWdOTR6\nL7l62a1j2GvfuQolTMj6+SoCDA+F6YSlNwrYPv970laoUL+FK65uTbQnh9SVXHO0\n/SK98RIIO65Mbu+iBP9T4QrabLUmnUpglMDHum6J77A5R7Tt3MBFC12zyrlSOzhO\n4DPBPnteVGgAIgMYBAR8KBGJkK2I51yAHja26KNCIQKBgQDvjvsLdNEnenH9klYU\nnjLLbyrxoj44LzoIUxLpcADtWSLMVCUS9FSc90lbJJ4F4gYlxszxgyU5yhYPFIa0\n6BIKIZtIPUQAlu60FTWMl9qL4ZucaDAWwLgyym9GCB7e/ijyLLA9JC475MzFX3zL\nzE5FevREixHSpWDmqo1X6Wj/ZQKBgQDl5ES9NmhDM8Uwix8Ar31vcRqF3Mwcxrk5\nJb57dpQM64cN+iNSkQ8VF0vcJc290g0k5sQXPOCjuf0vJdQj8UZUAA9dPrBSjd55\nJDOrVzcLoopeGyUZh4Ha53A6k0dQVl3NvicHpektbJ5vuFMj/6CbvQv8KcEYV9BF\neGpNlTtG1wKBgQDLxtB+GkygTGQS0xwuRbPnoRTinqRWnrW6xw/bSs8/Fwem0B0J\nVpVzQFdCFI/naTDZiZZkCq7rzZ+eDFPaJ17RB21Tsenapok+3pvCkJnzS2JXVbky\nYZVOfyzQYbAA+CpUdvcjy1cY07PsYSGDKrOaHtESTUpH6S3YiVPaaE5MkQKBgQC5\nt78QXHO+VoRmwv04wIzFCsoyej0qwh/AWw2XECRqi5t/XyRJ/4X/s+JE5wVe4+Ja\nfVLMsxGHMymmfRj0MGZwVdwTqCEpkBK6KtTTBpIhhB3kCGngRehRv8aai4CBFkSR\ngZxmQVIusCEOgAoqesh1CDQ2ckTcNZS7ipvWMUjB4QKBgHFC0VwfxVS3CZytUH0w\nwuw1fEifKnhjXh509UUQXWReL5N7/NlEvD3iaEaAN39fNfpYoRjgDtpx1MBMaZVr\nsXdv1jEhgomC27BGkx5bkMaU/RUrpZNuPb/qaOzvboySmruc0ukWfFlvkfLPk1WH\n0eqnKuncCZ+aAtzS/wAR5J+3\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-xhvmu@e-commerce-c21d9.iam.gserviceaccount.com",
    "client_id": "117232524921390836693",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xhvmu%40e-commerce-c21d9.iam.gserviceaccount.com"
  };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-commerce-c21d9.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://e-commerce-c21d9appspot.com");

 





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
    origin: ['http://localhost:3000', 'https://e-commerce-c21d9.firebaseio.com', "*"],
    credentials: true
}));

const productSchema = new mongoose.Schema({

     productname: { type: String, required: true },
     productdescription: { type: String },
     productprice: { type: number, required: true },
     productcode: { type: number, required: true },
     productImage: { type: String, required: true },
    
     createdOn: { type: Date, default: Date.now },
 });
 const productModel = mongoose.model('Products', productSchema);



 app.post("/product", upload.any(),  (req, res) => {

     console.log("product received: ", req.body);

     let newProduct = new productModel({
         productname: req.body.productname,
         productdescription: req.body.productdescription,
         productprice: req.body.productprice,
         productcode: req.body.productcode,
         productImage: req.body.productImage,
     })
     newProduct.save((err, result) => {

         if (!err) {
             res.send({
                 message: "product is created"
             })
             console.log(result, "product is created in database")
        } else {
            res.send({ message: "db error in saving product" });
            console.log()

        }



  })
})
  // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
  bucket.upload(
    req.files[0].path,
    {
        destination: `productImage/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
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



app.get("/products", (req, res) => {
    productModel.find({}, (err, result) => {
        if (err) {
            res.send({
                message: "error in getting all products"
            })
            console.log(err, "error in db")
            return;
        } else {
            res.send({
                message: "got all products",
                data: result
            })
        }
    }
 )









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




