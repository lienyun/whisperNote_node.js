const db = require('../db/index')

//顯示朋友列表
const getFriend = (req, res) => {
  const getFriendSql = 'SELECT user.user_id, user.email, friend.friend_id, friend.friend_displayname, friend.friend_pic FROM user LEFT JOIN friend ON user.user_id=friend.user_id WHERE user.user_id = ?'
  db.query(getFriendSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
    console.log('getFriend', results)
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
  console.log('addFriendEmail', friendContent)

  const addFriendSql = 'INSERT INTO friend(user_id, friend_id, friend_displayname, friend_pic) VALUES (?,(SELECT user.user_id FROM user WHERE user.email = ?),(SELECT user.displayname FROM user WHERE user.email = ?),(SELECT user.user_pic FROM user WHERE user.email = ?))'
  // TODO: 檢查有沒有這個email、已經是好友就不要再新增
  db.query(addFriendSql, [req.session.user_id,friendContent.email,friendContent.email,friendContent.email], (err, results) => {

    if (err) return res.cc(err)
    console.log(err)
    console.log('addFriend', results)
    if (results.affectedRows === 1)
      return res.send({
        status: 1,
        message: '新增好友成功！'
      })
  })
}

module.exports = {
  getFriend,
  addFriend
}