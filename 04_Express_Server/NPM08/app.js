const multer = require('multer');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('port', process.nextTick.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', express.static(path.join(__dirname, 'uploads')));
try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 현재 폴더의 최상위 폴더 아래에 생성
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



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'fileuploadex.html'));
});

app.post('/upload', upload.single('image'), (req, res)=>{
    return res.json({
        title:req.body.title, 
        description:req.body.description, 
        price:req.body.price, 
        filename:req.file.filename});
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '빈 포트에서 대기 중');
});

