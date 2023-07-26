const dbCon = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// const checkPassword = async (data, req, res) => {
//   console.log(req, "pwd");
//   if (await bcrypt.compare(req.passwordn, data[0].passwordn)) {

//     const token = jwt.sign(
//       {
//         email: data[0].email,
//         userId: result.rows[0].id,
//       },
//       "SECRETKEY",
//       {
//         expiresIn: "7d",
//       }
//     );
//     return res.json({
//       status: 200,
//       message: "Login success",
//       token: token,
//     });
//   }else{
//     res.status(400).json({
//       message: "Password is Incorrect"
//     })
//   }
// };

// const userLogin = async (req, res) => {
//   const { email, passwordn } = req.body;
//   const sqlQuery = `select * from user_information where email='${email}'`;
//   const sqlQuery1 = `select * from user_information where username='${email}'`;
//   await dbCon.query(sqlQuery, async (error, data) => {
//     try {
//       if (data.length == 0) {
//         await dbCon.query(sqlQuery1, async (error, data1) => {
//           if (data1.length == 0) {
//             res.json({
//               status: 400,
//               message: "User not exist",
//             });
//           } else {
//             checkPassword(data1, req.body, res);
//           }
//         });
//       }
//       if (data.length > 0) {
//         console.log("second", data);
//         res.json({
//           message: data,
//         });

//         checkPassword(data, req.body, res);
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({
//         message: error,
//       });
//     }
//   });
// };

// const getAll = async (req, res) => {
//   const sqlQuery = `select * from user_information`;
//   const sqlQuery1 = `select * from user_information`;
//   await dbCon.query(sqlQuery, async (error, data) => {
//     try {
//       if (data.length == 0) {
//         await dbCon.query(sqlQuery1, async (error, data1) => {
//           if (data1.length == 0) {
//             res.json({
//               status: 400,
//               message: "User not exist",
//             });
//           } else {
//           }
//         });
//       }
//       if (data.length > 0) {
//         console.log("second", data);
//         res.json({
//           message: data,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({
//         message: error,
//       });
//     }
//   });
// };

const userSignup = async (req, res) => {
  const { username, email, passwordn } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(passwordn, salt);
  const values = [username, email, hashpwd];

  const sqlQuery = `select * from admin_information where email='${email}'`;
  const sqlQuery1 = `insert into admin_information(username,email,passwordn) values(?)`;

  await dbCon.query(sqlQuery, async (error, data) => {
    try {
      if (data.length > 0) {
        res.json({
          status: 400,
          message: "User already exist",
        });
      }
      if (data.length == 0) {
        await dbCon.query(sqlQuery1, [values], (error, data1) => {
          if (data1) {
            res.json({
              status: 200,
              data: data1,
              message: `Sucessfully ${username} Registred`,
            });
          } else {
            res.json({
              status: 400,
              message: error,
            });
          }
        });
      }
    } catch (error) {
      res.json({
        status: 400,
        message: error,
      });
    }
  });
};

module.exports = { userSignup /* userLogin*/ };
