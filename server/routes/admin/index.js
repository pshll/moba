module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    //子路由
    const router = express.Router({
        mergeParams: true
    })

    //发送资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //获取资源
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    //根据id获取资源
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //修改资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')

    //图片上传
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //资源路由
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    //登录路由  422代表客户端提交数据有问题
    app.post('/admin/api/login', async (req, res) => {
        const {username, password} = req.body
        // 根据username找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户名或者密码错误')
        // 校验密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '用户名或者密码错误')
        // 返回token
        const token = jwt.sign({id: user._id,}, app.get('secret'))
        res.send({token})
    })

    // 错误处理
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}