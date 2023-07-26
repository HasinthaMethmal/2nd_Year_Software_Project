const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const addAdminRoute = require("./apis/routers/admin.routers");
const addSellerRoute = require("./apis/routers/seller.routers")
const buyerRoutes = require("./apis/routers/buyer.router")
const customersRouter = require("./routes/customers");
const adminRoutes = require("./Routes/userRouter")

require('dotenv').config();

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true
  }
});


mysqlConnection.connect((err) => {
  if (!err)
  console.log('Database Coonnected !');
else
  console.log('Database Connection failed');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/Admin",addAdminRoute);
app.use("/Seller",addSellerRoute);
app.use("/buyer",buyerRoutes);
app.use("/user",adminRoutes);


app.get("/", (req, res) => {
  res.send("Express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

///////////////////////////////////////////////////////////////////////////////////

app.post("/delivery_users", async (req, res) => {
  const { username, email, password, fullName, nic, address, mobile } = req.body;

  // hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if the email or username already exists in the database
  mysqlConnection.query(
    "SELECT * FROM delivery_users WHERE email = ? OR username = ?",
    [email, username],
    (error, results) => {
      if (error) {
        console.error("Error checking if email/username exists:", error);
        res.status(500).json({ error: "Server error" });
      } else if (results.length > 0) {
        // email or username already exists, send error response
        res.status(400).json({ error: "Duplicate email or username" });
      } else {
        // create a user object with the hashed password
        const user = { username, email, password: hashedPassword, fullName, nic, address, mobile }

        // insert the user into the database
        mysqlConnection.query(
          "INSERT INTO delivery_users SET ?",
          user,
          (error, results) => {
            if (error) {
              console.error("Error inserting user:", error);
              res.status(500).json({ error: "Error inserting user" });
            } else {
              console.log("User created:", results);
              res.status(201).json({ message: "User created" });
            }
          }
        );
      }
    }
  );
})

///////////////////////////////////////////////////////////////////////////////////

// Authenticate user and generate JWT token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in the database
  mysqlConnection.query(
    'SELECT * FROM delivery_users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        console.error('Error selecting user:', error);
        res.status(500).json({ error: 'Error selecting user' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Incorrect username or password' });
      } else {
        // Compare hashed password with user input
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) {
          res.status(401).json({ error: 'Incorrect username or password' });
        } else {
          // Generate JWT token
          const payload = { username: results[0].username };
          const token = jwt.sign(payload, 'secret_key', { expiresIn: '1h' });

          // Log JWT token in the console
          console.log(`JWT token: ${token}`);
          res.status(200).json({ token });
        }
      }
    },
  );
});

///////////////////////////////////////////////////////////////////////////////////

//GET all Orders
app.get('/delivery_orders', (req, res) => {
  mysqlConnection.query('SELECT * FROM delivery_orders', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

//GET Inprogress
app.get('/delivery_inprogress', (req, res) => {
  const username = req.query.username;
  mysqlConnection.query('SELECT * FROM delivery_inprogress WHERE username = ?', [username], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})


// Add the accepted delivery to the "Inprogress" table in the database
app.post('/delivery_inprogress', (req, res) => {
  const acceptedDelivery = req.body;
  mysqlConnection.query('INSERT INTO delivery_inprogress SET ?', acceptedDelivery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding delivery to "Inprogress" table');
    } else {
      res.status(200).send('Delivery added to "Inprogress" table');
    }
  });
});


//DELETE a row from Orders table
app.delete('/delivery_orders/:id', (req, res) => {
  const deliveryId = req.params.id;

  // Delete the delivery with the specified ID from the deliveries table in the database
  mysqlConnection.query('DELETE FROM delivery_orders WHERE id = ?', deliveryId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting delivery');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Delivery not found');
    } else {
      res.status(200).send('Delivery deleted successfully');
    }
  });
});


//GET all deliveries from orders table
app.get('/delivery_orders', (req, res) => {
  const sql = 'SELECT * FROM delivery_orders';
  mysqlConnection.query(sql, (error, rows, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving deliveries from the database');
    } else {
      res.send(rows);
    }
  });
});


// POST delivery data to Orders table
app.post('/delivery_orders', (req, res) => {
  const delivery = req.body;
  const { username, ...deliveryWithoutUsername } = delivery; // exclude username from delivery
  mysqlConnection.query('INSERT INTO delivery_orders SET ?', deliveryWithoutUsername, (err, result) => {
    if (err) throw err;
    console.log('Delivery added to orders table');
    res.status(200).send('Delivery added successfully');
  });
});


// DELETE delivery data from accepted table
app.delete('/delivery_inprogress/:id', (req, res) => {
  const deliveryId = req.params.id;
  mysqlConnection.query(`DELETE FROM delivery_inprogress WHERE id=${deliveryId}`, (err, result) => {
    if (err) throw err;
    console.log(`Accepted delivery with id ${deliveryId} deleted from the database.`);
    res.status(200).send('Delivery rejected successfully');
  });
});


/////////////////////////////////////////////////////////////////////////////////////

app.post('/delivery_myhistory', (req, res) => {
  const delivery = req.body;
  mysqlConnection.beginTransaction((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error beginning transaction');
      return;
    }
    mysqlConnection.query('INSERT INTO delivery_myhistory SET ?', delivery, (err, result) => {
      if (err) {
        mysqlConnection.rollback(() => {
          console.log(err);
          res.status(500).send('Error adding delivery to myhistory table');
        });
        return;
      }
      console.log('Delivery added to myhistory table');
      mysqlConnection.query('DELETE FROM delivery_inprogress WHERE id = ?', delivery.id, (err, result) => {
        if (err) {
          mysqlConnection.rollback(() => {
            console.log(err);
            res.status(500).send('Error deleting delivery from inprogress table');
          });
          return;
        }
        console.log('Delivery deleted from inprogress table');
        mysqlConnection.commit((err) => {
          if (err) {
            mysqlConnection.rollback(() => {
              console.log(err);
              res.status(500).send('Error committing transaction');
            });
            return;
          }
          res.status(200).send('Delivery added successfully');
        });
      });
    });
  });
});


//GET myhistory
app.get('/delivery_myhistory', (req, res) => {
  const username = req.query.username;
  mysqlConnection.query('SELECT * FROM delivery_myhistory WHERE username = ?', [username], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

/////////////////////////////////////////////////////////////////////////////////

//GET accepted
app.get('/delivery_accepted', (req, res) => {
  const username = req.query.username;
  mysqlConnection.query('SELECT * FROM delivery_accepted WHERE username = ?', [username], (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
})

