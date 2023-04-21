const { User, Shirt_Model } = require("../models");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

exports.getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.send(result);
  } catch (error) {
    console.log("Error desde getUsers", error);
  }
};

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, is_admin } = req.body;
  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      is_admin,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log("error al registrar el usuario", err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);
    const isValid = await user.validatePassword(password);
    if (!isValid) return res.sendStatus(401);

    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_admin: user.is_admin,
    };

    const token = generateToken(payload);

    res.cookie("token", token);

    res.send(payload);
    console.log(payload);
  } catch (err) {
    console.log("error desde loginUser", err);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (err) {
    console.log("error desde logoutUser", err);
  }
};

exports.updateUser = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const { id } = req.params;
  try {
    const user = await User.update(
      { first_name, last_name, email },
      { where: { id }, returning: true, plain: true }
    );
    res.send(user);
  } catch (err) {
    console.log("error desde updateUser", err);
  }
};

exports.updateUserByEmail = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        email: req.body.email,
      },
    });
    res.send(user);
  } catch (err) {
    console.log("error desde updateUserByEmail", err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        email: req.headers.email,
      },
    });
    res.sendStatus(202);
  } catch (err) {
    console.log("error desde deleteUser", err);
  }
};

/* exports.getMe = (validateAuth, (req, res) => {
  res.send(req.user);
});
 */
