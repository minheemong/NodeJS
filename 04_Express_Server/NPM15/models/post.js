// 모델명 : Post, 테이블명 : postMessage,
// 필드 : content(문자140, null 허용 안 함), img(문자200, null 허용)
// user와 1:N 관계표시
// timestamp true, underscored false, paranoid false 나머지 기존 사항 그대로
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content:{
                type:Sequelize.STRING(140),
                allowNull:false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through:'PostHashtag'});
    }
};