const express = require('express')

const app = express()

const cors = require('cors')

const bodyParser = require('body-parser');

const session = require('express-session')

app.use(session({
  secret: 'whispernote',
  resave: false, //固定寫法
  saveUninitialized: true //固定寫法
}))

//使用bodyParser解析post回來的資料(request body)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 封裝res.cc()
app.use(function (req, res, next) {
  // status = 1 为成功； status = 0 为失败； 默认将 status 的值设置为 0，方便处理失败的情况
  res.cc = function (err, status = 0) {
    res.send({
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})



app.use(cors())

app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use('/', userRouter)

const profileRouter = require('./router/profile')
app.use('/', profileRouter)

const diaryRouter = require('./router/diary')
app.use('/', diaryRouter)






app.listen(3000, ()=>{
  console.log('express server running at http://127.0.0.1:3000')
})