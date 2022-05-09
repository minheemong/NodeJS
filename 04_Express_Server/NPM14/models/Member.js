// userid, pwd, name, phone, email, created_at를 필드로 한 모델을 만들어주세요
// board의 writer와 member의 userid를 N:1 관계로 설정해주세요
// 기타의 설정은 board과 같은 설정이거나 맞춰서 설정합니다
const Sequelize = require('sequelize');
module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            userid : {
                type:Sequelize.STRING(30),
                allowNull:false,
                parimaryKey:true,
                unique:true,
            }, 
            pwd : {
                type:Sequelize.STRING(30),
                allowNull:false,
            }, 
            name : {
                type:Sequelize.STRING(30),
                allowNull:false,
            },  
            phone : {
                type:Sequelize.STRING(50),
                allowNull:false,
            }, 
            email : {
                type:Sequelize.STRING(50),
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
            modelName:'Member',
            tableName:'members',
            paranoid:false, 
            charset:'utf8',
            collate:'utf8_general_ci',
            // createdAt : 레코드 insert된 시간
            // updatedAt : 레코드 수정 update된 시간
            // deletedAt : 레코드 삭제 시간 - 실제 데이터를 삭제하지 않고 시간만 기록
        });
    }
    // 테이블 간 관계 설정 함수
    static associate(db){
        db.Member.hasMany(db.Board, {foreignKey:'writer',sourceKey:'userid', onDelete:'cascade'});
        // onDelete:'cascade' => Member의 레코드가 삭제되면, 해당 userid가 작성한 게시물을 Board에서 같이 삭제
    }
};