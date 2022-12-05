import express, { Router } from "express";
import {
  login,
  dashboard,
  userView,
  userBlock,
  unBlock,
  adminProfile,
  banner,
  addBanner,
  bannerList,
  editBanner,
  deleteBanner,
  subbanner,
  addSubBanner,
  deletesubBanner,
  editSubBanner,
} from "../controllers/adminControllers.js";

import {
  viewProduct,
  addProduct,
  add_Product,
  deleteProduct,
  editProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, adminLogout } from "../controllers/authControllers.js";
import { verifyAdmin } from "../middleware/authVerification.js";
import {
  addCategory,
  Category,
  editCategory,
} from "../controllers/categoryController.js";
import { upload } from "../middleware/muter.js";
import { deliveryStatus, order } from "../controllers/orders.js";

const router = express.Router();

// get;;;;;;;
router.get("/", verifyAdmin, dashboard);
router.get("/login", login);
router.get("/logout", verifyAdmin, adminLogout);
router.get("/product", verifyAdmin, viewProduct);
router.get("/profile", verifyAdmin, adminProfile);
router.get("/user", verifyAdmin, userView);
router.get("/userblock/:id", verifyAdmin, userBlock);
router.get("/unBlock/:id", verifyAdmin, unBlock);
router.get("/add-product", verifyAdmin, addProduct);
router.get("/editProduct/:id", verifyAdmin, editProduct);
router.get("/category", Category);
router.get("/banner", banner);
router.get("/bannerlist", bannerList);
router.get("/order", order);
router.get("/subbanner", subbanner);
// post::::::::
router.post("/Userlogin", adminAuth);
router.post("/addCategory", upload.single("Image"), addCategory);
router.post("/addCategory", addCategory);
router.post("/add", upload.array("img", 4), add_Product);
router.post("/edit/:id", upload.array("img", 4), updateProduct);
router.post("/editcategory/:id", upload.single("img"), editCategory);
router.post("/addBannar", upload.single("Image"), addBanner);
router.post("/editBanner/:id", upload.single("Image"), editBanner);
router.post("/addsubannar", upload.single("Image"), addSubBanner);
router.post("/editSubBanner/:id", upload.single("Image"), editSubBanner);

// Delete & patch
router.delete("/deleteproduct", deleteProduct);
router.delete("/deleteBanner", deleteBanner);
router.delete("/deletesubBanner", deletesubBanner);
router.patch("/deliveryStatus", deliveryStatus);

export default router;
