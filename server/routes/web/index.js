module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Hero = mongoose.model('Hero')
    const Category = mongoose.model('Category')

    //导入新闻
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ["DOTA2 12月15日更新日志：7.23e平衡性更新", "汇集玩家热爱 DOTA2斩获金翎奖“玩家最喜爱网络游戏”", "DOTA2 12月12日更新日志：7.23d平衡性更新", "赛场青春筑梦，捧杯高校之巅！完美世界全国高校联赛秋季赛海口落幕", "最后一役！城市赛DOTA2本周六苏州、杭州收官之战", "Monet分析版本之余推荐动漫，Yang评价虚无之灵花里胡哨", "完美盛典趣味短片 DOTA2年度最佳&amp;拉胯英雄", "明星嘉宾齐聚一堂 2019完美盛典圆满结束"]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)

        res.send(newsList)
    })

    //获取新闻列表
    router.get('/news/list', async (req, res) => {
        //聚合查询
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: {$slice: ['$newsList', 5]}
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: {$in: subCats}
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)

    })

    //获取英雄列表
    router.get('/heroes/list', async (req, res) => {
        //聚合查询
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        const cats = await Category.aggregate([
            {$match: {parent: parent._id}},
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: {$in: subCats}
            }).limit(10).lean()
        })
        res.send(cats)

    })

    //文章详情
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: {$in: data.categories}
        }).limit(2)
        res.send(data)
    })

    //英雄详情
    router.get('/heroes/:id', async (req, res) => {
        const data = await Hero.findById(req.params.id).lean()
        res.send(data)
    })

    app.use('/web/api', router)
}