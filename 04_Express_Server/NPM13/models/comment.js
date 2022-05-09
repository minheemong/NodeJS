const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // 필드를 정의
            // 누가, 무슨 말을, 언제 기록했는지가 필드로 쓰여질텐데
            // 누가에 해당하는 건 user의 id와 1:N 관계의 외래키 연결이 될 예정입니다. 그래서 따로 필드를 정의하지 않습니다. 
            // 왜? 연결해주면 user 테이블의 id 필드가 여기에 복사될 예정이기 때문입니다.
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }, 
            created_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue:Sequelize.NOW,
            },
        },{
            // 테이블 옵션
            sequelize,
            timestamps:false,
            modelName:'Comment',
            tableName:'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Comment.belongsTo(db.User, {foreignKey:'commenter', targetKey:'id'});
        // Comment 모델의 commenter 필드가 user 모델에 id필드를 참조하고 있습니다.
    }
};