const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({ // {필드}, {제약조건}
            // num, subject, Writer, text, readCount, createdAt
            // num -> 자동생성되는 id로 대체합니다
            // Writer -> Member 테이블의 userid와 1:N 관계로 생성합니다
            subject: {
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            content:{
                type:Sequelize.STRING(1000),
                allowNull:false,
            },
            readCount:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
                defaultValue:0,
            },
            created_at:{
                type:Sequelize.DATE,
                defaultValue:Sequelize.NOW,
            },
            filename:{
                type:Sequelize.STRING(45),
                allowNull:true,
            },
            realfilename:{
                type:Sequelize.STRING(45),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'Board',
            tableName:'boards',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        }); 
    }
    static associate(db){
        db.Board.belongsTo(db.Member, {foreignKey:'writer', targetKey:'userid'});
        db.Board.hasMany(db.Reply, {foreignKey:'boardnum',sourceKey:'id', onDelete:'cascade'});
    }
};