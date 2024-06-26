const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate') //请求处理函数
const expressJoi = require('@escook/express-joi')  //校验中间件 校验失败通过app.js全局中间件返回错误信息
const {add_cate_schema} = require('../schema/artcate') //名称与别名校验规则
const {delete_cate_schema} =require('../schema/artcate') //删除分类的id规则
const {get_cate_schema} = require('../schema/artcate') //根据id获取分类的id规则
const { update_cate_schema } = require('../schema/artcate') //根据id更新分类的id规则
// 1.获取文章分类列表的接口
router.get('/cates',artcate_handler.getArticleCates)

//2.新增文章分类的接口
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates) 

// 3.删除文章分类的接口
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.daleteCateById)

// 4.根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema),artcate_handler.getArticleById)

// 5.根据id更新文章分类
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handler.updateCateById)
module.exports = router