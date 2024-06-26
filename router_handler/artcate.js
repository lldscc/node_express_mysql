/**
 * 文章列表分类 请求逻辑处理模块
 */
const db = require('../db/index')

// 1.获取文章列表分类的模块
exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功...',
            data: results

        })
    })

}
// 2.新增文章分类
exports.addArticleCates = (req, res) => {
    // 2.1是否存在，占用
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('名称与别名已占用,请更换重试。')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('名称已占用,请更换重试。')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名已占用,请更换重试。')
        // 2.2实现新增
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}

// 3.删除文章分类 is_delete记录是否被删除
exports.daleteCateById = (req,res) =>{
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql,req.params.id,(err,results)=>{
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！',0)
    })
    
}

// 4.根据id获取文章分类
exports.getArticleById = (req,res) =>{
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql,req.params.id,(err,results) =>{
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类失败！')
        res.send({
            status:0,
            message:'获取文章分类成功',
            data:results[0]
        })
    })
}

// 5.根据id更新文章分类
exports.updateCateById = (req,res) =>{
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    db.query(sql,[req.body.Id,req.body.name,req.body.alias],(err,results) =>{
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('名称与别名已占用,请更换重试。')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('名称已占用,请更换重试。')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名已占用,请更换重试。')
        const sql = `update ev_article_cate set ? where Id=?`
        db.query(sql,[req.body,req.body.Id],(err,results) =>{
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            res.cc('更新文章分类成功！',0)
        })
    })
}

