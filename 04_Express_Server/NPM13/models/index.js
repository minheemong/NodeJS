
const Sequelize = require('sequelize'); // express와 mySQL 연결

// 만들어놓은 테이블을 위한 모듈을 이곳에 require 합니다

const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
  
sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; // node.js에 접속하기 위한 접속객체를 db 객체에 담습니다 
db.Sequelize = Sequelize; // require한 순수 Sequelize 모듈을 db 객체에 담습니다

// require한 user 모델과 comment 모델도 db에 담습니다
db.User = User;
db.Comment = Comment;

// 모델 객체를 초기화하는 함수와 관계 형성 함수를 실행합니다
User.init(sequelize);
Comment.init(sequelize);
User.associate(db);
Comment.associate(db);

// 여기까지의 코드가 테이블이 생성되는 내용으로 구성되는 코드입니다
// 아래 코드처럼 db가 exports되고, 이 내용이 app.js에 require되면,
// require된 db에서 sequelize를 꺼내서 sync함수를 실행하게 되고 이 때 테이블도 생성합니다


module.exports = db;
