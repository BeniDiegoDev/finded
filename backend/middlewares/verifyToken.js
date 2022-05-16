const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel");
const config = require("../routes/config");

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const result = jwt.verify(token.split(" ")[1], config.secret);
        const customerUser = await userModel.findOne({
            _id: result.id
        }).exec();
        req.customerUser = customerUser;
        next();

    }catch(err){
        res.status(401).send("Unauthorized !");
    }
};

module.exports = verifyToken;