const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  const { email, username, passwordn } = req.body;

  // 01.) Check whether the user available
  let queryLogin;
  if (!username) {
    queryLogin = `SELECT * FROM admin_information WHERE email='${email}'`;
  } else if (!email) {
    queryLogin = `SELECT * FROM admin_information WHERE username='${username}'`;
  }

  await db.query(queryLogin, async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (data.length === 0) {
      res.status(401).json({ error: "User not found" });
    } else {
      const user = data[0];
      // 02.) Check whether the password is correct
      const isPasswordMatch = await bcrypt.compare(passwordn, user.passwordn);
      if (!isPasswordMatch) {
        res.status(401).json({ error: "Invalid password" });
      } else {
        // 03.) If the user and password are correct, create a JSON Web Token (JWT)
        const token = jwt.sign({ id: user.id },"secreat", {
          expiresIn: "7d",
        });
        res.json({ 
          status: 200,
          messege: "Login success",
          token: token });
      }
    }
  });
};

exports.signUp = async (req, res) => {
  const { email, username, passwordn } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(passwordn, salt);

    const querySignUp = `INSERT INTO admin_information(username, email, passwordn) VALUES (?, ?, ?)`;
    const values = [username, email, hashpwd];

    await db.query(querySignUp, values);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.forgotPassword = async (req, res) => {
  // 01.) Get the email from the req.body
  const { email } = req.body;

  // 02.) Check if the user exists in the database
  const query = `SELECT * FROM admin_information WHERE email='${email}'`;
  await db.query(query, async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (data.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      const user = data[0];

      // 03.) Create a JWT token containing the user's email address and send it in an email
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cdf3e8d67690ff",
          pass: "2b085e72303f73",
        },
      });

      const mailOptions = {
        from: "admin@gmail.com",
        to: email,
        subject: "Password reset request",
        text: `Click the link below to reset your password: ${process.env.BASE_URL}/reset-password/${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Password reset link sent to your email" });
        }
      });

      console.log(token);
    }
  });

  res.status(200).json({
    message: "Email sent successfully",
  });
};

exports.resetPassword = async (req, res) => {
  // 01.) Get the token from the req.params
  const { resetToken } = req.params;

  // 02.) Vaildate the token
  jwt.verify(resetToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error(err);
      res.status(401).json({ error: "Invalid token" });
    } else {
      // 03.) Get the new password from the req.body
      const { passwordn } = req.body;

      // 04.) Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(passwordn, salt);

      // 05.) Update the user's password in the database
      const query = `UPDATE admin_information SET passwordn='${hashpwd}' WHERE email='${decoded.email}'`;
      await db.query(query, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json({ message: "Password reset successfully" });
        }
      });
    }
  });
};