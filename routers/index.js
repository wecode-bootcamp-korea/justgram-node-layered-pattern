const express = require('express')
const router = express.Router();

const userRouter = require('./userRouter')
const postingRouter = require('./postingRouter')

router.get('/ping', (req, res) => {
  res.json({ message: '/ pong' })
})
router.use('/users', userRouter);
// router.use('/postings', postingRouter);

module.exports = router