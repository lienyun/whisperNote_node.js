const db = require('../db/index')

//顯示朋友列表
const getFriend = (req, res) => {
  const getFriendSql = 'SELECT user.user_id, user.email, friend.friend_id, user.displayname, user_pic FROM user LEFT JOIN friend ON user_id=friend.user_id WHERE user_id = ?'
  db.query(getFriendSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
    console.log('getFriend',results)
    res.send({
      status:1, 
      message: '朋友名單GET',
      data: results
    })
  })
}

//新增好友
const addFriend = (req, res) => {
  const friendContent = req.body
  console.log(friendContent)
  const addFriendSql = 'SELECT * FROM users NATURAL JOIN friend ON user.user_id = friend.friend_id; '
  // TODO: 要用email去查是哪個user，然後插入user_id到friend
  db.query(addFriendSql, {user_id: req.session.user_id, friend_id: friendContent.email}, (err, results) => {
    if (err) return res.cc(err)
    console.log(err)
    if (results.affectedRows === 1) 
    return res.send({ status: 1, message: '新增好友成功！' })
  })
}

module.exports = {
  getFriend,
  addFriend
}