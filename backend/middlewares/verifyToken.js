const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel");

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const result = jwt.verify(token.split(" ")[1], "findedAddToken");
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