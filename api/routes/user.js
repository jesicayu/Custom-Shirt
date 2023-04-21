const express = require("express");
const userController = require("../controllers/userController");
const { validateAuth } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);

userRouter.post("/logout", userController.logoutUser);

userRouter.put("/:id", userController.updateUser);

userRouter.put("/", userController.updateUserByEmail);

userRouter.delete("/", userController.deleteUser);

//userRouter.get("/me", userControllers.getMe);
// tuve que dejar la ruta me en este  contexto y no en controllers
// porque era la única que se rompía

userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
