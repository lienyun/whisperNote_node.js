const db = require('../db/index')

//顯示朋友列表
const getFriend = (req, res) => {
  const getFriendSql = 'SELECT user.user_id, user.email, friend.friend_id, friend.friend_displayname, friend.friend_pic, friend_email FROM user LEFT JOIN friend ON user.user_id=friend.user_id WHERE user.user_id = ?'
  db.query(getFriendSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)

    res.send({
      status: 1,
      message: '朋友名單GET',
      data: results
    })
  })
}

//新增好友
const addFriend = (req, res) => {

  const friendContent = req.body

  //沒有這個user
  const noUserSql = 'select * from user where email = ?'
  db.query(noUserSql, friendContent.email, (err, results) => {

    if (err) return console.log(err.message)
    if (results.length === 0) {
      return res.send({
        status: 0,
        message: '沒有這個user，請重新輸入！'
      })
    }

    //已經是好友了
    const friendNowSql = 'select * from friend where friend.friend_id = (select user.user_id from user where user.email = ?) AND user_id = ?'
    db.query(friendNowSql, [friendContent.email, req.session.user_id], (err, results) => {
      if (err) return console.log(err.message)
      if (results.length > 0) {
        return res.send({
          status: 0,
          message: '已經是好友了，請重新輸入！'
        })
      }

      //加好友
      const addFriendSql = 'INSERT INTO friend(user_id, friend_id, friend_displayname, friend_pic) VALUES (?,(SELECT user.user_id FROM user WHERE user.email = ?),(SELECT user.displayname FROM user WHERE user.email = ?),(SELECT user.user_pic FROM user WHERE user.email = ?))'
      db.query(addFriendSql, [req.session.user_id, friendContent.email, friendContent.email, friendContent.email], (err, results) => {

        if (results.email === friendContent.email) {
          return res.send({
            status: 0,
            message: '不要輸入自己的email'
          })
        }

        if (err) return res.cc(err)
        console.log(err)
        console.log('addFriend', results)
        if (results.affectedRows === 1)
          return res.send({
            status: 1,
            message: '新增好友成功！'
          })
      })
    })
  })
}

// 刪除好友
const deleteFriend = (req, res) =>{
  const deleteFriendContent = req.body
  const deleteFriendSql = 'DELETE FROM friend WHERE user_id = ? AND friend_id = ?'
  db.query(deleteFriendSql, [req.session.user_id, deleteFriendContent.friend_id, (err, results) => {
    if (err) return res.cc(err)
    if(results.affectedRows === 1){
      console.log('刪除成功！')
    }
  }])
}

module.exports = {
  getFriend,
  addFriend,
  deleteFriend
}