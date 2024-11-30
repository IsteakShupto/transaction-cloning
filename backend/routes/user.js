const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Incorrect inputs / please meet the input requirements.",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });

  res.json({
    message: `You have successfully created an account. ${user._id}`,
  });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Incorrect inputs / please meet the input requirements",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    message: `Welcome to nagad, ${user._id}`,
    token: token,
  });
});

const editUserBody = zod.object({
  username: zod.string().email().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = editUserBody.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      message: "Please provide correct inputs.",
    });
  }

  const user = await User.updateOne(
    {
      _id: req.userId,
    },
    {
      $set: req.body,
    }
  );

  res.json({
    message: "User successfully updated.",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.json({
    users: users,
  });
});

module.exports = router;
