const express = require("express");
const Message = require("./messageModel");
const {authenticateToken} = require("./jwtHandler");
const router = express.Router();
const logger = require('./logger');

router.post("/save", async (req, res) => {
    authenticateToken(res, req)
    const body = req.body;
    if(!body.message || !body.userId){
        res.status(400).json({ error: "Message body is missing!" });
        logger.error(`Message body is missing : , ${body}`);
    } else {
        let MessageBody = {
            "useId": body.userId,
            "message": body.message,
        }
        const message = new Message(MessageBody);
        logger.info(`Message saved : , ${MessageBody}`); 
        message.save().then((doc) => res.status(200).send(doc));
    }
});

module.exports = router;