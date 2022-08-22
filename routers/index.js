const express = require('express')
const router = express.Router();

const userRouter = require('./userRouter')
const postingRouter = require('./postingRouter')

router.use('/users', userRouter);
// router.use('/postings', postingRouter);

module.exports = router