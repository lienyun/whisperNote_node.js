const db = require('../db/index')

//顯示朋友列表
const getFriend = (req, res) => {
  const getFriendSql = 'select * from friend where user_id = ?'
  db.query(getFriendSql, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
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
  const addFriendSql = 'insert into friend set ?'
  db.query(addFriendSql, friendContent.user_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) 
    return res.send({ status: 1, message: '新增好友成功！' })
  })
}

module.exports = {
  getFriend,
  addFriend
}