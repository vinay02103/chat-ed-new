const Messages = require("../models/message");

const addChat = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully" });

    return res.json({ msg: "Request failed" });
  } catch (ex) {
    next(ex);
  }
};
const getChats = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const sendChats = messages.map((message) => {
      return {
        self: message.sender.toString() === from,
        message: message.message.text,
      };
    });

    return res.json(sendChats);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addChat, getChats };
