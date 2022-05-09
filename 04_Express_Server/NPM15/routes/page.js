const express = require('express');
const { Post, User, Hashtag } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');

const router = express.Router();

/*router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
});*/

router.get('/', async (req, res, next)=>{
    try{
        // 포스트 검색
        const posts = await Post.findAll({
            include:{
                model:User,
                attributes: ['id', 'nick'],
            },
            order:[['createdAt', 'DESC']],
        });
        res.render(
            'main', 
            {
                title:'Nodegram', 
                user:req.user, 
                // 로그인 유저가 없으면 0, 있으면 인원 수(length-레코드 개수)
                followerCount: req.user? req.user.Followers.length : 0, 
                followingCount: req.user? req.user.Followings.length : 0,
                // 로그인 유저가 없으면 빈 배열, 있으면 팔로잉들의 아이디를 배열로 
                followerIdList: req.user? req.user.Followings.map(f=>f.id) : [], 
                posts}
            );
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/join', isNotLoggedIn, (req, res, next)=>{
    res.render('join', {title: '회원가입 - NodeGram'});
});

router.get('/hashtag', async(req, res, next)=>{
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.findOne({ where: {title:query}});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({ include : [{model: User}]});
        }
        return res.render('main',{
            title: `${query} | NodeGram`,
            posts,
            user:req.user,
            followerCount : req.user? req.user.Followers.length : 0,
            followingCount : req.user? req.user.Followings.length : 0,
            followerIdList : req.user? req.user.Followings.map(f=>f.id) : [],
        })
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {
        title: '내 정보 = NodeGram',
        user:req.user,
        followerCount : req.user? req.user.Followers.length : 0,
        followingCount : req.user? req.user.Followings.length : 0,
        followerIdList : req.user? req.user.Followings.map(f=>f.id) : [],
    });
});
module.exports = router;