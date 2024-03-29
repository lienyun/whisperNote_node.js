const e = require('cors')
const db = require('../db/index')

//新增日記
const addPostDiary = (req, res) =>{
  const diaryContent = req.body
  const addSql = 'insert into diary set ?'
  db.query(addSql, {title: diaryContent.title, date: diaryContent.date, content: diaryContent.content, user_id: req.session.user_id, permission_id: diaryContent.permission},(err, results) =>{
    if (err) return res.cc(err)
    if (results.affectedRows === 1) return res.send({status:1, message: '新增日記成功！'})
  })
}

//get所有分類
const getPer = (req, res) => {
  const getPerSql = 'select * from diarypermission where user_id = ?'
  db.query(getPerSql, req.session.user_id, (err, results) =>{
    if (err) return console.log(err.message)
    // console.log(results)
    res.send({ status: 1, message: '取得分類成功！', data: results })
  })
}

//新增分類
const addPer = (req, res) => {
  const perContent = req.body
  // console.log(perContent)
  const addPerSql = 'insert into diarypermission set ?'
  db.query(addPerSql, { user_id: req.session.user_id, per_name: perContent.newPermission}, (err, results) => {
    if (err) return res.cc(err)
    res.send({ status: 1, message: '新增分類成功！' })
  })
}

// 所有的日記(月曆)(我+朋友的)
const getDiary = (req, res)=>{
  const getDiarySql = 'select * from diary NATURAL JOIN diarypermission where user_id = ? and diary_status = 1 ORDER BY date DESC'
  db.query(getDiarySql, req.session.user_id, (err, results)=>{
    if (err) return res.cc(err)
    res.send({
      status:1 ,
      message:'GET到你日記了啦！',
      data: results
    })
  })
}

// 我的日記
const getMyDiary = (req, res)=>{
  const getDiarySql = 'select * from diary NATURAL JOIN diarypermission where user_id = ? and diary_status = 1'
  db.query(getDiarySql, req.session.user_id, (err, results)=>{
    if (err) return res.cc(err)
    console.log('getMyDiary',results)
    res.send({
      status:1 ,
      message:'GET到你日記了啦！',
      data: results
    })
  })
}

//修改日記
const editDiary = (req, res) => {
  const diaryContent = req.body.diaryDetail
  // console.log('diaryContent', diaryContent)

  const editSql = 'UPDATE diary SET title = ?, date = ?, permission_id=?, content = ? WHERE diary_id = ?'
  db.query(editSql, [diaryContent.title, diaryContent.date, diaryContent.permission_id, diaryContent.content, diaryContent.diary_id], (err, results) => {

    console.log('修改日記', results)
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      console.log('修改日記成功')
    }
    res.send({
      status:1,
      message: '修改日記成功',
      data: results
    })
  })
}


// 1: 存在的日記 0: 刪除的日記
const deleteDiary = (req, res) => {
  const diaryContent = req.body
  // console.log(diaryContent)
  const deleteSql = 'update diary set diary_status = 0 where diary_id = ?'
  db.query(deleteSql, diaryContent.diary_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      console.log('標記刪除成功！')
    }
    res.send({
      status:1,
      message: '標記刪除',
      data: results
    })
  })
}

//get朋友的日記
const getFriendDiary = (req, res) =>{
  const gerFriendId = 'SELECT friend_id FROM friend WHERE user_id = ?'

  db.query(gerFriendId, req.session.user_id, (err, results) => {
    if (err) return res.cc(err)
    let friend_id_array = results.map(e => e.friend_id)
    let friend_id = friend_id_array.toString()

    const getFriendDiarySql = `SELECT * FROM diary NATURAL JOIN diarypermission WHERE user_id IN (${friend_id})`
    db.query(getFriendDiarySql, (err, results) => {

    if (err) return res.cc(err)
    res.send({
      status:1,
      message: '取得朋友的日記',
      data: results
    })

    })
  })
}

module.exports = {
  addPostDiary,
  getDiary,
  deleteDiary,
  editDiary,
  addPer,
  getPer,
  getMyDiary,
  getFriendDiary
}