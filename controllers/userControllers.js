import { bannerModel } from "../model/banner.js";
import { cartModel } from "../model/cart.js";
import { productModel } from "../model/product.js";
import Jwt from "jsonwebtoken";

const index = async (req, res) => {
  res.locals.user = req.session.user;
  let user = req.session.user;
  let banner = bannerModel
    .find()
    .then((banner) => {
      let product = productModel
        .find()
        .limit(4)
        .then((product) => {
          let secondProduct = productModel
            .find()
            .skip(4)
            .then((secondProduct) => {
              res.render("user/index", {
                banner,
                product,
                secondProduct,
                user,
              });
            });
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const cart = async (req, res) => {
  res.locals.user = req.session.user;
  try {
    const token = req.cookies.Jwt;
    if (token) {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
      const cartProduct = await cartModel
        .findOne({ user: userId })
        .populate("cart.product");
      res.render("user/cart", { cartProduct });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    req.flash("Msg", " login for access");
    res.redirect("/login");
  }
};

const userProfile = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/profile");
};

const contact = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/contact");
};

const Signup = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/signup", { expressFlash: req.flash("Msg") });
};

const login = (req, res) => {
  res.locals.user = req.session.user;
  res.render("user/login", { expressFlash: req.flash("Msg") });
};

const validation = (req, res) => {
  const phone = req.session.newUser.Phone;
  res.render("user/otp", { phone, expressFlash: req.flash("Msg") });
};

const Sample = (req, res) => {
  res.render("user/Smaple");
};

export { Signup, validation, Sample, login, index, cart, contact, userProfile };
