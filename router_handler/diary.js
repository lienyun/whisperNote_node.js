const db = require('../db/index')

const addPostDiary = (req, res) =>{
  const diaryContent = req.body
  const addSql = 'insert into diary set ?'
  db.query(addSql, {title: diaryContent.title, time: diaryContent.time, content: diaryContent.content, user_id: req.session.user_id, permission_id: 1},(err, results) =>{
    if (err) return res.cc(err)
    if (results.affectedRows === 1) return res.send({status:1, message: '新增日記成功！'})
  })

}

// 所有的日記
const getDiary = (req, res)=>{
  const getDiarySql = 'select * from diary where user_id = req.session.user_id'
  db.query(getDiarySql, (err, results)=>{
    if (err) return res.cc(err)
    console.log(results)
    res.send({status:1 ,message:'GET到你日記了啦！'})
  })
}

//修改日記
const editDiary = (req, res) => {
  const editSql = 'update diary set ? where user_id = req.session.user_id'
}


// 1: 使用中的帳號 0: 停用中的帳號
const deleteDiary = (req, res) => {
  const deleteSql = 'update user set status = 0 where id = req.session.user_id'
  db.query(deleteSql, (err, results) => {
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
  editDiary
}