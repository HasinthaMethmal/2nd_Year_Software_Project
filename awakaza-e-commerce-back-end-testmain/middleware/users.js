const jwt = require("jsonwebtoken");
module.exports = {
    isLoggedIn: (req, res, next) => {
        if(!req.headers.authorization){
          return res.status(401).send({
            msg: 'Your session is not valid!'
          });
        }
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(
            token,
            'SECRETKEY'
          );
          req.userData = decoded;
          next();
        } catch (err) {
          return res.status(401).send({
            msg: 'Your session is not valid!'
          });
        }
      }
}