const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUser,
  updateUser,
  userPurchaseList
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

//whenever following router i.e. /user/:<anuthing> being called it's populate by getUserById automatically

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);
/*Assignment*/
// router.get("/users",  getAllUser);

module.exports = router;
