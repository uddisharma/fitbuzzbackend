const OrderModel = require("../models/order.js");
const nodemailer = require("nodemailer");
// import Mailgen from "mailgen";
const Mailgen = require("mailgen");
class orderController {
  static SendOrders = async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        alternatephone,
        state,
        district,
        city,
        zipcode,
        address,
        order,
        paymentmethod,
        // payment,
        amount,
        orderDate,
        deliveryDate,
        status,
        paymentID,
        orderID,
        shipmentID,
      } = req.body;
      // console.log(req.body)
      const orderdetails = new OrderModel({
        name: name,
        email: email,
        phone: phone,
        alternatephone: alternatephone,
        state: state,
        district: district,
        city: city,
        zipcode: zipcode,
        address: address,
        order: order,
        paymentmethod: paymentmethod,
        amount: amount,
        orderDate: orderDate,
        deliveryDate: deliveryDate,
        status: status,
        paymentID: paymentID,
        orderID: orderID,
        shipmentID: shipmentID,
      });
      // console.log(orderdetails);
      await orderdetails.save();
      res.status(200).json({
        msg: "order confirmed ",
      });
      // let config = {
      //   service: "gmail",
      //   auth: {
      //     user: process.env.USER,
      //     pass: process.env.PASS,
      //   },
      // };
      // let transporter = nodemailer.createTransport(config);
      // let maingenerator = new Mailgen({
      //   theme: "default",
      //   product: {
      //     name: "Fitbuzz Wellness",
      //     link: "https://mailgen.js/",
      //   },
      // });
      // let response = {
      //   body: {
      //     name: name,
      //     intro: "Order Confimed",
      //     table: {
      //       data: [
      //         {
      //           description:
      //             "Your order has been confirmed. Here is your order id is" +
      //             " " +
      //             orderdetails.orderID +
      //             " " +
      //             "Now you can track your order with this id or you can check status in your profile / your orders",
      //         },
      //       ],
      //     },
      //     outro: "Thanks from Fitbuzz Shop",
      //   },
      // };
      // let mail = maingenerator.generate(response);
      // let message = {
      //   from: "uddibhardwaj08@gmail.com",
      //   to: email,
      //   subject: "your order has been confirmed",
      //   html: mail,
      // };
      // transporter.sendMail(message).then(() => {
      //   return res.status(200).json({
      //     msg: "Email has been sent successfully",
      //   });
      // });
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong",
        data: req.body,
      });
    }
    // const {
    //   name,
    //   email,
    //   phone,
    //   alternatephone,
    //   state,
    //   district,
    //   city,
    //   zipcode,
    //   address,
    //   order,
    //   paymentmethod,
    //   payment,
    //   amount,
    // } = req.body;
    // if (
    //   name &&
    //   email &&
    //   phone &&
    //   alternatephone &&
    //   state &&
    //   district &&
    //   city &&
    //   zipcode &&
    //   address &&
    //   order &&
    //   paymentmethod &&
    //   payment &&
    //   amount
    // ) {
    //   const orderdetails = new OrderModel({
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     alternatephone: alternatephone,
    //     state: state,
    //     district: district,
    //     city: city,
    //     zipcode: zipcode,
    //     address: address,
    //     order: order,
    //     paymentmethod: paymentmethod,
    //     payment: payment,
    //     amount: amount,
    //   });
    //   await orderdetails.save();
    //   res.send(orderdetails);
    //   let config = {
    //     service: "gmail",
    //     auth: {
    //       user: process.env.USER,
    //       pass: process.env.PASS,
    //     },
    //   };
    //   let transporter = nodemailer.createTransport(config);
    //   let maingenerator = new Mailgen({
    //     theme: "default",
    //     product: {
    //       name: "Fitbuzz Wellness",
    //       link: "https://mailgen.js/",
    //     },
    //   });
    //   let response = {
    //     body: {
    //       name: name,
    //       intro: "Order Confimed",
    //       table: {
    //         data: [
    //           {
    //             description:
    //               "Your order has been confirmed. Here is your order id is" +
    //               " " +

    //               " " +
    //               "Now you can track your order with this id or you can check status in your profile / your orders",
    //           },
    //         ],
    //       },
    //       outro: "Thanks from Fitbuzz Shop",
    //     },
    //   };
    //   let mail = maingenerator.generate(response);
    //   let message = {
    //     from: "uddibhardwaj08@gmail.com",
    //     to: email,
    //     subject: "your order has been confirmed",
    //     html: mail,
    //   };
    //   transporter.sendMail(message).then(() => {
    //     return res.status(200).json({
    //       msg: "Email has been sent successfully",
    //     });
    //   });
    // } else {
    //   res.send("All fields are required");
    // }
  };
  static GetOrders = async (req, res) => {
    try {
      const data = await OrderModel.find()
        .sort("OrderDate")
        .then((orders) => {
          res.status(200).send(orders);
          // console.log(orders.user.order);
        });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static UserOrders = async (req, res) => {
    const email = req.params.email;
    try {
      const data = await OrderModel.find({ email }).then((orders) => {
        res.status(200).send(orders);
        // console.log(orders.user.order);
      });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static OrderbyId = async (req, res) => {
    const _id = req.params.id;
    try {
      const data = await OrderModel.findById({ _id }).then((orders) => {
        res.status(200).send(orders);
        // console.log(orders.user.order);
      });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static UpdateOrder = async (req, res) => {
    try {
      const _id = req.params.id;

      const status = req.body.status;

      const data = await OrderModel.findByIdAndUpdate(_id, {
        $set: {
          status: status,
        },
      }).then((orders) => {
        res.status(200).send(orders);
        // console.log(orders.user.order);
      });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  };
  static DeleteOrder = async (req, res) => {
    const _id = req.params.id;
    try {
      const data = OrderModel.findByIdAndDelete({ _id })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          res.status(400).send(error.message || error);
        });
    } catch (error) {
      res.state(400).send(error.message || error);
    }
  };
  static updateStatus = async (req, res) => {
    const _id = req.params.id;
    const status = req.body.status;
    try {
      const data = await OrderModel.findByIdAndUpdate(_id, {
        $set: {
          status: status,
        },
      }).then((orders) => {
        res.status(200).send(orders);
        // console.log(orders.user.order);
      });
    } catch (error) {
      res.status(400).send(error.message || error);
    }
  }
}
module.exports = orderController;
