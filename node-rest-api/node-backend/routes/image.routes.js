const express = require("express");
var fs = require("fs");
var path = require("path");
const app = express();

const imageRoute = express.Router();
let Image = require("../model/Image");
let User = require("../model/User");

// Multer
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});

var upload = multer({ storage: storage });

// Add Image
imageRoute
  .route("/add-image")
  .post(upload.single("image"), (req, res, next) => {
    // imgurl = path.join( __dirname, "..", "..", "/uploads/", req.file.filename);
    imgurl = "http://127.0.0.1:8080/" + req.file.filename;

    Image.create({ ...req.body, imgurl }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });

// Get all Image
imageRoute.route("/").get((req, res) => {
  Image.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Image
imageRoute.route("/get-image/:id").get((req, res) => {
  Image.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Delete Image
imageRoute.route("/delete-image/:id").delete((req, res, next) => {
  Image.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Add User
imageRoute.route("/add-user").post((req, res, next) => {
  User.create({ ...req.body, isLoggedIn: false }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Login User
imageRoute.route("/login-user/").post((req, res, next) => {
  User.findOneAndUpdate(
    { name: req.body.username, password: req.body.password },
    { $set: { isLoggedIn: "true" } },
    { overwrite: true },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("User " + req.body.username + " logged in!");
      }
    }
  );
});

// Logout User
imageRoute.route("/logout-user").get((req, res, next) => {
  User.findOneAndUpdate(
    { isLoggedIn: "true" },
    { $set: { isLoggedIn: "false" } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("User " + data.username + " logged out!");
      }
    }
  );
});

// Get user
imageRoute.route("/get-logged-in-user/").get((req, res) => {
  User.findOne({ isLoggedIn: "true" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = imageRoute;
