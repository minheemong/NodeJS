const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/', async(req, res, next)=>{
    // sequlize의 레코드 추가 함수는 : create
    // await 모델명(User).create({필드명:전달인수, 필드명:전달인수, ...});
   try{
        const comment = await Comment.create({
            commenter:req.body.id, 
            comment:req.body.comment, 
        });
        console.log(comment);
        res.json(comment);
    } catch(err){
        console.error(err);
        next(err); // 에러 루틴이 있는 라우터로 이동
    }
});


router.get('/', async(req, res, next)=>{
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const comments = await Comment.findAll({
            include:{
                model:User,
            }, // join을 위해서 주인공테이블과 외래키관계(1:N) 테이블의 모델을 include합니다. 이렇게 해서 join효과를 볼 수 있습니다
        });
        // 결과를 json 형식으로 리턴해줍니다
        res.json(comments);
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }
});

// :id -> 와일드카드 문자로 전송되는 req의 url 중 :id 위치에 전송되는 단어를 id 변수에 넣고 진행되는 url입니다.
// 정확한 구분을 위해서 '/' 라우터 보다 위쪽에 위치하면 안됩니다.
router.get('/:id', async(req, res, next)=>{
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const comments = await Comment.findAll({
            include:{
                model:User,
                where : {id:req.params.id}, // 조건 검색
            }, 
        });
        res.json(comments);
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }
});

router.patch('/:id', async(req, res, next)=>{
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const result = await Comment.update({
            comment:req.body.comment, 
        },{
            where : {id:req.params.id}
        });
        res.json(result);
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }
});

router.patch('/remove/:comment', async(req, res, next)=>{
    try{
        // User 객체를 통해 users 테이블의 모든 데이터 조회
        const result = await Comment.destroy({
            where : {comment:req.params.comment},
        });
        res.json(result);
    }catch{
        console.error(err);
        next(err);// 에러 루틴이 있는 라우터로 이동
    }
});
// User.update({
//     comment:'바꿀 내용',
// },{
//     where : {id:2},
// });
module.exports = router;