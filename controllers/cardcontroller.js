const CardModel = require("../models/Card.js");
const multer = require("multer");
const bodyParser = require("body-parser");
var path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
console.log(upload);
class Cardcontroller {
  static create_product = async (req, res) => {
    const {
      name,
      category,
      price,
      mrp,
      discount,
      video,
      stock,
      description,
      keywords,
      bestseller
    } = req.body;
    // if (name && weight && particular && composition && mrp && rate && imgUrl) {
    const product = new CardModel({
      name: name,
      category: category,
      price: price,
      mrp: mrp,
      discount: discount,
      video: video,
      images: req.files,
      stock: stock,
      description: description,
      keywords: keywords,
      bestseller:bestseller
    });
    await product.save();
    res.json({ status: "success", msg: "product is created successfully" });
    // } else {
    //   res.send("All fields are required");
    // }
  };
  static update_product = async (req, res) => {
    const _id = req.params.id;
    const { name, weight, particular, composition, mrp, rate, imgUrl } =
      req.body;
    // if (name && weight && particular && composition && mrp && rate && imgUrl) {
    const card = await CardModel.findByIdAndUpdate(_id, {
      $set: {
        name: name,
        weight: weight,
        particular: particular,
        composition: composition,
        mrp: mrp,
        rate: rate,
        imgUrl: imgUrl,
      },
    });
    // await card.save();
    res.send("product is updated successfully");
    // } else {
    //   res.send("All fields are required");
    // }
  };
  static update_stock = async (req, res) => {
    const _id = req.params.id;
    const { stock } = req.body;
    // if (name && weight && particular && composition && mrp && rate && imgUrl) {
    const card = await CardModel.findByIdAndUpdate(_id, {
      $set: {
        stock: stock,
      },
    });
    // await card.save();
    res.send("Stock is updated successfully");
    // } else {
    //   res.send("All fields are required");
    // }
  };
  static get_products = async (req, res) => {
    try {
      const { keywords, name, sort, category } = req.query;
      // console.log(req.query);
      const queryobj = {};
      if (keywords) {
        queryobj.keywords = { $regex: keywords, $options: "i" };
      }
      if(category){
        queryobj.category = { $regex: category, $options: "i" };
      }
      if (name) {
        queryobj.name = name;
      }

      let page = Number(req.query.page);
      let limit = Number(req.query.limit);
      let skip = (page - 1) * limit;
      const api = CardModel.find(queryobj);
      // console.log(req.query.sort, 84);
      const AllProducts = await api
        .sort(req.query.sort)
        .skip(skip)
        .limit(limit)
        .then((data) => {
          res.json({ products: data });
        });

      // 2nd
      // console.log(req.query.sort)
      //     const AllProducts = await CardModel.find()
      //       .then((data) => {
      //         res.json({ products: data });
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static get_products_byID = async (req, res) => {
    const _id = req.params.id;
    // console.log(_id);
    try {
      const AllProducts = await CardModel.findById({ _id }).then((data) => {
        res.json({ products: data });
      });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static update_product_inc = async (req, res) => {
    const _id = req.params.id;
    const { stock } = req.body;
    try {
      const card = await CardModel.findByIdAndUpdate(_id, {
        $set: {
          stock: stock,
        },
      });

      res.send("Stock is updated successfully");
    } catch (error) {
      res.status(400).send("error");
    }
  };
  static Delete = async (req, res) => {
    const _id = req.params.id;
    try {
      const AllProducts = await CardModel.findByIdAndDelete({ _id }).then(
        (data) => {
          res.json({ msg: "Deleted Successfully", products: data });
        }
      );
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static BestSellers = async (req, res) => {
    const topseller = await CardModel.find({ bestseller: true })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
 
}
// export default Cardcontroller;
module.exports = Cardcontroller;
