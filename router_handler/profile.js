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
  const updateContent = req.body

  //先改自己的username
  const sql = 'update user set ? where user_id = ?'
  db.query(sql, [updateContent, req.session.user_id], (err, results) => {
    if (err) return console.log(err.message)
    if(results.affectedRows !== 1){
      return res.send({
        status: 0,
        message: '更新用戶資料失敗'
      })
    }


    //friend table也要修改
    const joinSql = 'UPDATE friend INNER JOIN user ON friend.friend_id = user.user_id SET friend.friend_id = user.user_id, friend.friend_displayname = user.displayname, friend.friend_pic = user.user_pic WHERE user.user_id = ?'
    db.query(joinSql, req.session.user_id, (err, results) => {
      if (err) return console.log(err.message)
      return res.send({
        status: 1,
        message: 'friend table修改成功'
      })
    })


  })
}

module.exports = {
  getProfile,
  updateProfile
}