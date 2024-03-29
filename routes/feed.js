const router = require("express").Router();
const { body } = require('express-validator/check');
const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");
const upload = require("../middleware/multer");

router.get("/posts", isAuth, feedController.getPosts);
router.post("/post", isAuth, 
// [
//   body("content").trim().isLength({min: 5})
// ],
 feedController.createPost);
router.get("/post/:postId", isAuth, feedController.getPost);
router.put("/post/:postId", isAuth, [
  body("content").trim().isLength({min: 5})
], feedController.updatePost);
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router