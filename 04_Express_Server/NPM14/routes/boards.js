const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const { Sequelize } = require('../models');
const router = express.Router();

// 직적 사용할 라우터파일에서 필요한 require을 사용하는 게 효율적일 수 있습니다
const multer = require('multer');
const fs = require('fs');
const path = require('path');
try{
    fs.readdirSync('public/upload');
}catch{
    console.error('upload 폴더가 없어 upload 폴더를 생성합니다')
    fs.mkdirSync('public/upload')
}

const upload = multer(
    { storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/upload/'); // 폴더 설정
            }, filename(req, file, done){
                const ext = path.extname(file.originalname); // 확장자 추출
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
        }
    ), 
    limits:{ fileSize: 5*1024*1024},} // 업로드 파일 사이즈의 제한
);

router.get('/', (req, res)=>{
    const loginUser = req.session.loginUser;
    res.render('main', {lUser:loginUser});
})

router.get('/boardList', async(req, res, next)=>{
    try{
        const boardList = await Board.findAll({
            order:[['id', 'DESC']],
        });
        res.json(boardList);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/replycnt/:id', async(req, res, next)=>{
    try{
        const result = await Reply.findAll({
            where: {boardnum:req.params.id},
        });
        res.json({cnt:result.length});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/boardView/:id', async(req, res)=>{
    try{
    // 게시물 검색
        const result = await Board.findOne({
            attribute : ['readCount'],
            where : {id:req.params.id},
        });
    // 검색한 게시물의 조회수를 추출해서 +1 연산
        let cnt = result.readCount+1;
    // 연산한 결과를 검색한 게시물에 update합니다
        await Board.update({
            readCount:cnt,
        },{
            where: {id:req.params.id},
        });
    // 다시 게시물을 검색
        const board = await Board.findOne({
            where : {id:req.params.id},
        });
    // 검색결과를 render에 포함시켜줍니다.
        const luser = req.session.loginUser;
        const dt = new Date();
        res.render('boardView', {board, luser, dt});
    }catch{
        console.error(err);
        next(err);
    }
});

router.get('/writeForm', async(req, res, next)=>{
    try{
        const luser = req.session.loginUser;
        res.render('writeForm', {luser});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/insertBoard', upload.single('image'), async(req, res, next)=>{
    try{
        const board = await Board.create({
            subject:req.body.subject,
            writer:req.body.writer,
            content:req.body.text,
            filename:req.file.originalname,
            realfilename:req.file.filename,
        });
        res.json(board);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/updateForm/:id', async(req, res)=>{
    try{
        // 전달된 아이디로 게시물을 조회한 후 updateForm.html로 렌더링, 세션에 있는 유저아이디, 조회한 게시물과 같이 이동
        const board = await Board.findOne({
            where : {id:req.params.id},
        });
        res.render('updateForm', {board});
    }catch(err){
        console.error(err);
    }
});

router.post('/update', upload.single('image'), async(req, res, next)=>{
    try{
        // 전달된 값으로 게시물을 수정합니다
        if(req.file != undefined){
            await Board.update({
                subject:req.body.subject,
                content:req.body.content,
                filename:req.file.originalname,
                realfilename:req.file.filename,
            },{
                where : {id:req.body.id},
            });
        } else{
            await Board.update({
                subject:req.body.subject,
                content:req.body.content,
            },{
                where : {id:req.body.id},
            });
        }
        // 게시물 번호로 해당 게시물을 보던 페이지로 되돌아갑니다. 이 때 조회수는 늘어나지 않습니다
        res.redirect('/boards/boardView2/'+req.body.id);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/boardView2/:id', async(req, res)=>{
    try{
        //게시물을 검색
            const board = await Board.findOne({
                where : {id:req.params.id},
            });
        // 검색결과를 render에 포함시켜줍니다.
            const luser = req.session.loginUser;
            const dt = new Date();
            res.render('boardView', {board, luser, dt});
        }catch{
            console.error(err);
        }
});

router.get('/deleteBoard/:id', async(req, res, next)=>{
    //해당 아이디로 게시물을 삭제한 후 boards로 이동해주세요
    try{
        await Board.destroy({
            where : {id:req.params.id},
        });
        res.redirect('/boards');
    }catch{
        console.error(err);
        next(err);
    }
});

router.post('/addReply' , async (req, res)=>{
    try{
        await Reply.create({
            writer : req.body.writer,
            content : req.body.reply,
            boardnum : req.body.boardnum,
        });
        res.end();
    }catch(err){
        console.error(err);
    }
});

router.get('/replyList/:boardnum', async(req, res)=>{
    try{
      const replys = await Reply.findAll({
            where:{boardnum:req.params.boardnum},
        });
        res.json(replys);
    }catch(err){
        console.error(err);
    }
});

router.delete('/deleteReply/:id', async(req, res)=>{
    try{
       
            const replys = await Reply.destroy({
                where:{id:req.params.id},
            });
            res.json(replys);
        
    }catch(err){
        console.error(err);
    }
});
 
module.exports = router;