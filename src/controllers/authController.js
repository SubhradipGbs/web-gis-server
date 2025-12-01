const { login, createUserLog } = require("../services/authService");

const userLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const results = await login(email, password);
    const { password: pass, ...data } = results;
    if (!results) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully Login", data });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const userLogout = async (req, res) => {
  const { userId } = req.body;
  try {
    await createUserLog({ userId, action: "Logout", status: "Successful" });
    res.status(200).json({ message: "Successfully Loggedout" });
  } catch (eer) {
    await createUserLog({ userId, action: "Logout", status: "Unsuccessful" });
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userLogin, userLogout };
