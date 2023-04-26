// const express = require('express')
// const dotenv = require("dotenv");
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose');
// const cors = require('cors')
// const multer = require('multer')
// var path = require('path')
// const ConnectDB= require('./config/connectdb.js')
// const DATABASE_URL = process.env.DATABASE_URL;
// ConnectDB("mongodb://127.0.0.1:27017")
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// var upload = multer({ storage: storage });
// // const upload = multer({ dest: 'uploads/' })

// const app = express()
// app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.static('public'))
// const ProductModel = mongoose.model('prod', {
//     category: { type: String },
//     images: { type: Array, },
// });
// app.post('/image', upload.array('products', 12), (req, res) => {
//   console.log(req.files)
//  let temp_arr = []
//   for(let x of req.files)
//  {
//   temp_arr.push(x.path)
//  }
//  console.log(temp_arr)
//     let result = ProductModel.create({
//         category: req.body.category,
//         images: temp_arr

//     })
//     if (result) {
//         res.send({ code: 200, message: 'Upload Success' })
//     } else {
//         res.send({ code: 500, message: 'Upload Err' })
//     }
// })
// app.get('/image', async (req, res) => {
//     let products = await ProductModel.find({})
//     if (products.length > 0) {
//         res.send({ code: 200, data: products })
//     } else {
//         res.send({ code: 500, message: 'Server Err' })
//     }
// })

// app.listen(5000, () => {
//     console.log(`Backend Running At Port 5000`)
// })

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
dotenv.config();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/connectdb.js");
const userRoutes = require("./routes/userRoutes.js");
const cardRoutes = require("./routes/cardRoutes.js");
const adminRoute = require("./routes/adminRoutes.js");
const contactRoute = require("./routes/contactRoutes.js");
const orderRoute = require("./routes/OrderRoute.js");
const userVarRoute = require("./routes/uservarRoutes.js");
const couponRoute = require("./routes/couponRoutes.js");
const cancelfeedbackRoute = require("./routes/cancelFeedbackRoutes.js");
const ProductModel = require("./models/Card.js");
require("./controllers/passport.js");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
//  const upload = multer({ dest: 'uploads/' })
app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  origin: process.env.REMOTE_CLIENT_APP
};
connectDB(DATABASE_URL);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.post("/create-product", upload.array("products", 12), (req, res) => {
  // console.log(req.files);
  let temp_arr = [];
  for (let x of req.files) {
    temp_arr.push(x.path);
  }
  // console.log(temp_arr);
  let result = ProductModel.create({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    mrp: req.body.mrp,
    discount: req.body.discount,
    video: req.body.video,
    images: temp_arr,
    stock: req.body.stock,
    description: req.body.description,
    keywords: req.body.keywords,
    // bestseller: req.body.bestseller,
    length: req.body.length,
    breadth:req.body.breadth,
    height:req.body.height,
    weight:req.body.weight
  });
  if (result) {
    res.send({ code: 200, message: " product Upload Success" });
  } else {
    res.send({ code: 500, message: "Upload Err" });
  }
});
// app.get("/products", async (req, res) => {
//   let products = await ProductModel.find({});
//   if (products.length > 0) {
//     res.send({ code: 200, data: products });
//   } else {
//     res.send({ code: 500, message: "Server Err" });
//   }
// });
app.put("/update-product/:id", upload.array("products", 12), (req, res) => {
  // console.log(req.files);
  const _id = req.params.id;
  let temp_arr = [];
  for (let x of req.files) {
    temp_arr.push(x.path);
  }
  ProductModel.findByIdAndUpdate(
    _id,
    {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      mrp: req.body.mrp,
      discount: req.body.discount,
      video: req.body.video,
      images: temp_arr,
      stock: req.body.stock,
      description: req.body.description,
      keywords: req.body.keywords,
    },
    function (err, docs) {
      if (!err) {
        res.send({ code: 200, message: "Update Success" });
      } else {
        res.send({ code: 400, message: "Update Err" });
      }
    }
  );

  // if (result) {
  //   res.send({ code: 200, message: "Update Success" });
  // } else {
  //   res.send({ code: 400, message: "Update Err" });
  // }
});
app.use("/", userVarRoute);
app.use("/", userRoutes);
app.use("/", adminRoute);
app.use("/", cardRoutes);
app.use("/", contactRoute);
app.use("/", orderRoute);
app.use("/", couponRoute);
app.use("/", cancelfeedbackRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
