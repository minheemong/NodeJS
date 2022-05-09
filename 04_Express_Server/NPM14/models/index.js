const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, config);

// 각 테이블에 대한 모델을 만들고, require해서 db 객체에 넣고, exports 합니다
const Member = require('./member');
const Board = require('./board');
const Reply = require('./reply');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = Member;
db.Board = Board;
db.Reply = Reply;

Member.init(sequelize);
Board.init(sequelize);
Reply.init(sequelize);

Member.associate(db);
Board.associate(db);
Reply.associate(db);

module.exports = db;
