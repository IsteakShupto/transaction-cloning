const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const to = req.body.to;
  const amount = req.body.amount;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "You don't have sufficient balance in your account.",
    });
  }

  const receiverAccount = await Account.findOne({
    userId: to,
  }).session(session);

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $set: {
        balance: account.balance - amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $set: {
        balance: receiverAccount.balance + amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Money transferred successfully.",
  });
});

module.exports = router;
