// id(댓글번호), boardnum(게시물 번호), writer(댓글작성자), content(댓글내용), created_at(작성일시)
// id는 자동생성, boardnum은 Board의 id와 1:N 관계로 설정
// 나머지 다른 설정은 다른 테이블의 설정을 따르거나 맞춰서 설정합니다
const Sequelize=require('sequelize');
module.exports = class Reply extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            writer:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            content:{
                type:Sequelize.STRING(200),
                allowNull:false,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps:false, 
            modelName:'Reply',
            tableName:'replys',
            paranoid:false, 
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.Reply.belongsTo(db.Board, {foreignKey:'boardnum', targetKey:'id'});
    }
}