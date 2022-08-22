const userDao = require("../models/userDao")
// service는 오로지 dao에만 의존
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async (email, password) => {
	console.log('service 1')
  // email 중복 체크 기능
	
	// password 암호화
  const salt = bcrypt.genSaltSync(12);

  const hashedPw = bcrypt.hashSync(password, salt)
  const user = await userDao.createUser(email, hashedPw)
	return user
}

const getUser = async (email) => {
	const user = await userDao.getUser(email)
	return user
}

module.exports = {
	createUser
}