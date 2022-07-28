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
  const gerPerSql = 'select * from diarypermission where user_id = ?'
  db.query(getPerSql, req.session.user_id, (err, results) =>{
    if (err) return console.log(err.message)
    console.log(results)
    res.send({ status: 1, message: '取得分類成功！' })
  })
}

//新增分類
const addPer = (req, res) => {
  const perContent = req.body
  const addPerSql = 'insert into diarypermission set ?'
  db.query(addPerSql, { user_id: req.session.user_id, per_name: perContent.newPermission}, (err, results) => {
    if (err) return res.cc(err)
    res.send({ status: 1, message: '新增分類成功！' })
  })
}

// 所有的日記
const getDiary = (req, res)=>{
  const getDiarySql = 'select * from diary where user_id = ? and diary_status = 1'
  db.query(getDiarySql, req.session.user_id, (err, results)=>{
    if (err) return res.cc(err)
    console.log(results)
    res.send({
      status:1 ,
      message:'GET到你日記了啦！',
      data: results
    })
  })
}

//修改日記
const editDiary = (req, res) => {
  const diaryContent = req.body
  const editSql = 'update diary set title = ?, date = ?, content = ? where diary_id = ?'
  db.query(editSql, [diaryContent.title, diaryContent.date, diaryContent.content], (err, results) => {
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
  const deleteSql = 'update diary set diary_status = 0 where diary_id = ?'
  db.query(deleteSql, diaryContent.diary_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows === 1) {
      console.log('標記刪除成功！')
    }
  })
}

module.exports = {
  addPostDiary,
  getDiary,
  deleteDiary,
  editDiary,
  addPer,
  getPer
}