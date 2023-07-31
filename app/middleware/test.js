var jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require("../models/users");


const test = async (req, res, next) => {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token, "=================")
        try {
            const decode = await jwt.verify(token, "token");
            console.log(decode, "+++++++++++decode++++++++++++++++")
            const user = await User.findOne({ _id: decode.user._id });
            console.log(user, "++++++++++++user+++++++++++++");
            if (!user) {
                res.status(401).json({ data: "access denied user not found" });
                return;
            }
            next();
        } catch (error) {
            res.status(401).json({ "error": error.message });
        }
    }
    else {
        return res.send('please give token ')
    }


    // console.log(req.headers.authorization);
    // res.status(401).json({data:"access denied"});
}

module.exports = test;