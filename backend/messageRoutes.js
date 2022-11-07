const express = require("express");
const Message = require("./messageModel");
const router = express.Router();

router.post("/save", async (req, res) => {
    const body = req.body;
    if(!body.message || !body.userId){
        res.status(400).json({ error: "Message body is missing!" });
    } else {
        let MessageBody = {
            "useId": body.userId,
            "message": body.message,
        }
        const message = new Message(MessageBody);
        message.save().then((doc) => res.status(200).send(doc));
    }
});

module.exports = router;