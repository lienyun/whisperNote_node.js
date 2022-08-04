const express = require('express')

const app = express()

const cors = require('cors')

const bodyParser = require('body-parser');

const session = require('express-session')

app.use(session({
  secret: 'whispernote',
  resave: false, //固定寫法
  saveUninitialized: true, //固定寫法
  cookie: {
 
    // Session expires after 1 day of inactivity.
    expires: 8640000
}
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

app.use((req, res, next) => {
  //res.locals, session都是express-session設定的全域變數，每個模板都可以使用
  //把path存到全域變數，後續可以直接使用，render時不用再傳入path參數
  res.locals.path = req.url;
  //把isLogin存在全域變數，登入狀態(布林值)
  res.locals.isLogin = req.session.isLogin || false;
  //把csrfToken存在全域變數
  // res.locals.csrfToken = req.csrfToken();
  next();
});



app.use(cors())

app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use('/', userRouter)

const profileRouter = require('./router/profile')
app.use('/', profileRouter)

const diaryRouter = require('./router/diary')
app.use('/', diaryRouter)

const friendRouter = require('./router/friend')
app.use('/', friendRouter)

const characterRouter = require('./router/character')
app.use('/', characterRouter)









app.listen(3000, ()=>{
  console.log('express server running at http://127.0.0.1:3000')
})