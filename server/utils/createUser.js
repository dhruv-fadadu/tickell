const bcrypt = require("bcrypt");
const { client } = require("../config/db");

async function createAdminUser() {
  // The password you'd like to store (this should be a plain text password)
  const plainPassword = "admin_secure_password";

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // SQL query to insert an admin user into the users table
  const query = `
    INSERT INTO users (username, email, password_hash, role, phone_number, profile_info)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  // Values to be inserted
  const values = [
    "admin_user", // username
    "admin@example.com", // email
    hashedPassword, // password_hash
    "admin", // role (admin)
    "123-456-7890", // phone number (optional)
    "Administrator account", // profile info (optional)
  ];

  try {
    // Run the insert query
    await client.query(query, values);
    console.log("Admin user created successfully!");
  } catch (err) {
    console.error("Error inserting admin user:", err);
  } finally {
    client.end(); // Close the database connection
  }
}

// Call the function to create the admin user
createAdminUser();
