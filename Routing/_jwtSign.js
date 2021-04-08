const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    // console.log(req.headers.authorization.split(' ')[1])
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.send({msg:'Access denied',msgType:'error'}).status(401)

    try{
        // verify the token
        const payload = jwt.verify(token, process.env.JWT_TOKEN_GENERATOR_SECRET);
        // if valid, save its payload to req.company
        req.userID = payload;
       // console.log(verified);
        next()
    } catch{
        res.send({msg:'Access denied, please re-login', msgType:'error'}).status(400);
    }
}