const dotenv = require('dotenv')
dotenv.config()
const http = require('http')
const express = require('express')
const userController = require("./controllers/userController")

const app = express()
app.use(express.json())


app.get('/ping', (req, res) => {
  res.json({ message: '/ pong' })
})

app.post('/signup', userController.createUser);


app.post('/postings', async (req, res) => {
  // PART 1 :  data check from request body
  const { user_id, contents } = req.body;
  console.log('user id : ', user_id, '___contents: ', contents)

  // PART 2 : database 저장
  await myDataSource.query(`
    INSERT INTO postings (user_id, contents)
    VALUES (?, ?)
  `,[user_id, contents])

  // PART 3 : 응답 전송
  res.status(201).json({ message: "postingCreated" })
})

app.get('/postings', async (req, res) => {
  // PART 1 :  data check from request body

  // PART 2 : database 가져오기

  const postingData = await myDataSource.query(`
    SELECT
      users.id as user_id,
      postings.id as posting_id,
      contents,
      username
    FROM justgram.postings
    JOIN justgram.users ON users.id = postings.user_id;
  `
  )

  console.log('postingData: ', postingData)
  // PART 3 : 응답 전송
  res.status(200).json({"data": postingData})
})

app.get('/postings/user/1', async (req, res) => {
  const postings = await myDataSource.query(`
    SELECT
      users.id as user_id,
      username,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', postings.id,
          'postingContents', postings.contents
        )
      ) as postings
    FROM justgram.postings
    JOIN justgram.users ON users.id = postings.user_id
    WHERE users.id = 1
    GROUP BY users.id
  ;`)
  res.status(200).json({"data": postings})
})


app.patch('/postings/1', async (req, res) => {
  // PART 1 : data check from request body
  const { newContents } = req.body
  // PART 2 : database 조작
  // 기존 컨텐츠를 newContents로 변경 using SQL

  const id = 1

  await myDataSource.query(`
    UPDATE postings
      SET contents = ?
      WHERE id = ?;
  `, [newContents, id])

  const newPostingData = await myDataSource.query(`
    SELECT
      users.id as user_id,
      postings.id as posting_id,
      contents,
      username
    FROM justgram.postings
    JOIN justgram.users ON users.id = postings.user_id
    WHERE postings.id = 1
  `) 

  // PART 3 : 응답 전송
  res.status(200).json({message: newPostingData})

})

app.delete('/postings/1', async (req, res) => {
  // PART 1 : data check from request body
  // PART 2 : database 조작
  const deleteComment = await myDataSource.query(`
    DELETE FROM comments WHERE comments.posting_id = 1;
  `)
  const deleteData = await myDataSource.query(`
    DELETE FROM postings WHERE postings.id = 1;
  `)
  // PART 3 : 응답 전송

  // solution 1 : comment first
  // solution 2 : db 만들 때 부터, comments테이블에게 -> 
    //posting이 지워지면, (parent column이 지워지면) ON_DELETE 옵션
    // 1. 그대로 남아있을래 -> ___________
    // 2. 따라서 사라질래?  -> cascade
    // 3. null로 비워둘래? -> setnull 


  res.status(204).json({message: 'deleted!'})
})


app.post('/login', async(req, res) => {

  // PART 1 : request body
  const { username, password } = req.body.data

  // PART 2 : database 조작
  // username을 이용하는 사용자가 DB에 있는지 확인
  const [user] = await myDataSource.query(`
    SELECT 
      id, 
      username, 
      password 
    FROM users 
    WHERE username = ?
  `, [username])

  console.log('USER: ', user)

  // 없으면 -> 없는 유저 입니다.
  // undefined false -> true
  // undefined falsy -> truthy

  if (!user) {
    console.log("NO_USER")
    res.status(400).json({message: "NO_USER"})
  }

  // user 있으면 -> 유저 데이터 및 유저 비밀번호 디비에서 꺼내오고,
  const isPasswordCorrect = bcrypt.compareSync(password, user.password) // true or false

  // false
  if (!isPasswordCorrect) {
    res.status(400).json({message: "INVALID_PASSWORD"})
  }

  // token 생성
  const token = jwt.sign({ userId: user.id }, 'secretKey');

  // send token to frontend

  res.status(200).json({message: 'LOGIN_SUCCESS', token: token})
})

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('server is listening on PORT 8000')
})