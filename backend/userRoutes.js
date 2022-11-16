const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./jwtHandler")
const logger = require('./logger');

router.post("/signup", async (req, res) => {
  const body = req.body;

  if (!(body.username && body.password && body.number && body.name && body.role)) {
    logger.error(`Data not formatted properly`)
    return res.status(201).send({ error: "Data not formatted properly" });
  }

  const userValidation = await User.findOne({ username: body.username });
  if (userValidation) {
    logger.error(`User already there in the database`)
    res.status(201).json({ error: "User exist!" });
  } else {
      // creating a new mongoose doc from user data
      const user = new User(body);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      logger.info(`User registered to the System`)
      user.save().then((doc) => res.status(200).send({user: doc}));
  }

});

// Test Route for JWT Testing
router.get("/jwt-testing", (req, res) => {
    authenticateToken(res, req)
    res.json({status: "jwt-success"});
})

router.post("/login", async (req, res) => {
  // authenticateToken(res, req)
  const body = req.body;
  const user = await User.findOne({ username: body.username });
  if (user) {
    // check user password with hashed password stored in the database'
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
        const Payload = {
            username: user.username,
            name: user.name,
            number: user.number,
            role: user.role
        }
      // JSON Web Tokens
      const jwtUser = { username: body.username, number: body.number, role: body.role };
      const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);
      logger.info(`User login successful`)
      res.status(200).json({payload: Payload, token: accessToken});

    //   return user;
    }else{
      logger.error(`Username or Password is incorrect`)
      res.status(201).json({ error: "Username or Password is incorrect" });
    }
  } else {
    logger.error(`User doesn't exist`)
    res.status(201).json({ error: "User does not exist" });
  }
});

router.put("/resetPassword/:username", async (req, res) => {
  authenticateToken(res, req)
  const body = req.body;


  const userOld = await User.findOne({ username: req.params.username });

  const validPassword = await bcrypt.compare(body.password, userOld.password);

  if(validPassword){

    const user = new User({
      _id: userOld._id,
      name: userOld.name,
      username: userOld.username,
      password: body.newPassword,
      number: userOld.number,
      role: userOld.role,
    });
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);

        User.updateOne({_id: userOld._id }, user).then(
          () => {
            logger.info(`Password updated successfully`)
            res.status(200).json({
              message: 'Thing updated successfully!'
            });
          }
        ).catch(
          (error) => {
            logger.error(`Error while changing the password`)
            res.status(201).json({
              error: error
            });
          }
        );
  }else{
    logger.error(`Incorrect old password`)
    res.status(201).json({error: "Old password is incorrect" })
  }
});

module.exports = router;
