const { createUser } = require("../services/userService");

const newUser = async (req, res) => {
  try {
    const result = await createUser(req.body);
    if (!result) {
      res.status(400).json({ message: "Error creating user" });
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { newUser };