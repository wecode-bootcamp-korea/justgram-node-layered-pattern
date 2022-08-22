const userService = require("../services/userService")
// controller 는 오로지 service에만 의존

const createUser = async (req, res) => {

	console.log('controller 1')
	const { email, password } = req.body.data;
	const hasKey = { password: false, username: false };
  const requireKey = Object.keys(hasKey);
	 // key error catch

	const user = await userService.createUser(email, password)

	console.log('controller 2')

  res.status(201).json({ message: "userCreated" });
}

module.exports = {
	createUser
}
