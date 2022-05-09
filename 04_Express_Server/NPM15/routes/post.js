const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Hashtag } = require('../models');
const { nextTick } = require('process');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');

const router = express.Router();

try{
    fs.readdirSync('uploads');
}catch{
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다')
    fs.mkdirSync('uploads')
}

const upload = multer(
    { storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/'); // 폴더 설정
            }, filename(req, file, done){
                const ext = path.extname(file.originalname); // 확장자 추출
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }
    ), 
    limits:{ fileSize: 5*1024*1024},} // 업로드 파일 사이즈의 제한
);


/*
router.post('/posting', upload.single('img'), async(req, res, next)=>{
    try{
        const post = await Post.create({
            content:req.body.content,
            img:req.file.filename,
            UserId:1,
        });
        res.json({});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/', async(req, res, next)=>{
    try{
        const result = await Post.findAll({
            include : {
                model:User,
                attributes: ['id', 'nick'],
            },
            order : [['createdAt', 'DESC']],
        });
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});
*/

router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{
    res.json({url : `/img/${req.file.filename}` });
    console.log({url : `/img/${req.file.filename}`});
}); // 그림만 업로드하고, 저장된 경로를 json 형식으로 되돌려줍니다.

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
    try{
        const currentPost = await Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId : req.user.id,
        });
        // 게시물을 포스팅할 때 같이 입력한 해시태그를 골라내서, 단어 별로 처음 나온 단어를 해시태그 테이블에 insert하고, 현재 게시물이 어떤 해시태그를 갖고 있는지 posthashtags 테이블에 inset합니다

        // 전송된 content에서 해시태그를 골라내고 각각 태그별로 저장하면, 정규표현식이 필요합니다
        // 짧거나 긴 문장 속에서 전화번호, 우편번호, ip주소 등 특정 형식이 있는 일부 단어를 골라내고자할 때 쓰는 표현식을 정규표현식이라고 합니다.

        // "안녕하세요 반갑습니다. 신발이 예쁘네요 #신발 #예쁜신발 #많이파세요"

        const hashtags = req.body.content.match(/#[^\s#]*/g);
        // '#'으로 시작해서 빈칸과 '#'이 아닌 곳까지를 단어로 모두 검색
        if(hashtags){ // 추출한 해시태그가 하나 이상 있다면...
            const result = await Promise.all(
                hashtags.map(tag=>{
                    return Hashtag.findOrCreate({
                        where : {title: tag.slice(1).toLowerCase() }, // slice(1) #을 제외
                    }) // 맨 앞에 #을 제외한 단어를 테이블에서 찾고 없으면 추가
                }),
            );
            await currentPost.addHashtags(result.map(r=>r[0])); 
            // 지금 추가한 post 게시물에 대한 posthashtags 테이블에 추가
            // as를 지정하지 않아서 addHashTag로 사용
            
            // addHashtags : Post와 Hashtag 간 관계에 through로 설정된 posthashtag 테이블에 현재 insert된 post의 id와 해시태그들을 연결해서 추가하세요
            // removeHashtags, findHashtags... 테이블 이름에 s를 붙여 복수형으로 표기하기도 합니다
        }
        res.redirect('/');
    }catch(err){
        console.error(err);
        nextTick(err);
    }
});

module.exports = router;