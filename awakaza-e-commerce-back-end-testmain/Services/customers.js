const db = require("./db");

async function getMultiple() {
  return await db.query(`SELECT * FROM customers`);
}

async function create(customer) {
  const crypto = require("crypto");
  const result = await db.query(
    `INSERT INTO customers 
    (uuid, name, address, contactNo, email,NIC) 
    VALUES ("${crypto.randomUUID()}", "${customer.name}", "${customer.address}", "${customer.contactNo}", "${customer.email}","${customer.NIC}")`
  );

  let message = "Error in adding customer";

  if (result.affectedRows) {
    message = "Customer added successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM customers WHERE uuid="${id}"`);

  let message = "Error in deleting customer";

  if (result.affectedRows) {
    message = "Customer deleted successfully";
  }

  return { message };
}

async function update(id, customer) {
  const result = await db.query(
    `UPDATE customers 
    SET name="${customer.name}", address="${customer.address}", contactNo="${customer.contactNo}", 
    email="${customer.email}", NIC="${customer.NIC}"
    WHERE uuid="${id}"`
  );

  let message = "Error in updating customer";

  if (result.affectedRows) {
    message = "Customer updated successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  remove,
  update,
};
