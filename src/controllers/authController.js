const { login } = require("../services/authService");

const userLogin = async (req, res) => {
  console.log(req.body);
    const { email, password } = req.body;
  try {
    const results = await login(email, password);
    const { password:pass, ...data } = results;
    console.log(data);
    if (!results) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully Login",data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userLogin };
