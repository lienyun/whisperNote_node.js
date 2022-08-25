const db = require('../db/index')

//取得用戶資料(顯示在profile頁面)
const getProfile = (req, res) => {
  const profileSql = 'select user_id, displayname, email, user_pic from user where user_id= ?'
  db.query(profileSql, req.session.user_id, (err, results) => {
    if (err) return console.log(err.message)
    if (results.length !== 1) return res.cc('取得用戶資訊失敗')
    res.send({
      status: 1,
      data: results[0]
    })
  })
}
//更新profile
const updateProfile = (req, res) => {
  const profileContent = req.body
  const sql = 'update user set ? where id = ?'
  db.query(sql, [profileContent, req.session.user_id],(err, results) =>{
    if (err) return console.log(err.message)
    if (results.length !== 1) return res.cc('修改用戶資訊失敗')
    res.send('更新用戶資訊成功', 0)

//   })
// }

module.exports = {
  getProfile,
  updateProfile
}