const db = require('../db/index')

const bcrypt = require('bcryptjs')



// 注册用户的处理函数
const postSignup = (req, res) => {
  const userinfo = req.body

  if (!userinfo.displayName || !userinfo.email || !userinfo.password) {
    return res.cc('姓名、email或密碼不能為空！')
  }

  const sql = 'select * from user where email = ?'
  db.query(sql, userinfo.email, (err, results) => {
    if (err) return console.log(err.message)
    if (results.length > 0) {
      return res.cc('email已使用，請使用其他的email')
    }
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //定義插入新用戶的SQL語句
    const sqlInsert = 'insert into user set ?'
    db.query(sqlInsert, { displayname: userinfo.displayName, email: userinfo.email, password: userinfo.password }, (err, results) => {
      if (err) return res.cc(err)

      //判斷影響行數是否為1
      if (results.affectedRows !== 1) return res.cc('註冊用戶失敗')

      //註冊成功
      res.send({ status: 1, message: '註冊成功！' })
    })
  })




}

const postLogin = (req, res) => {
  const userinfo = req.body

  const sql = 'select * from user where email = ?'
  db.query(sql, userinfo.email, (err, results) => {
    const comparePassword = bcrypt.compareSync(userinfo.password, results[0].password)

    if (err) return console.log(err.message)

    if (userinfo.email !== results[0].email || !comparePassword) {
      return res.cc('email或密碼有誤！請重新登入！')
    }

    req.session.userinfo = req.body
    req.session.user_id = results[0].user_id
    req.session.isLogin = true
    res.send({ status: 1, message: '登入成功！' })
  })

}

const postLogout = (req, res) => {
  req.session.destroy(
    res.send({
      status: 1,
      msg: '登出成功'
    })
  )
}


module.exports = {
  postSignup,
  postLogin,
  postLogout
}