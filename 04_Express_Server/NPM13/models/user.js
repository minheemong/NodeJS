// node가 sequelize를 이용해서 mysql에 테이블을 생성하거나 조작할 수 있는 '테이블모델'을 만듭니다
const Sequelize = require('sequelize');
// 아래의 형태로 만들어진 객체를 export 하고 , app.js에서 가져다 쓸 예정
module.exports = class User extends Sequelize.Model{
    // 테이블을 생성하고 초기화하는 함수
    static init(sequelize){
        return super.init({ // init 함수에 각 필드의 이름(키)과 속성(값)들이 매칭된 객체가 전달됩니다 
            // 각각의 필드를 정의
            // 첫 번째 필드 : id라는 필드는 자동 증가 필드로 생성되기 때문에 정의하지 않습니다
            name : {
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            }, 
            age : {
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            }, 
            married :{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            }, 
            comment :{
                type:Sequelize.TEXT,
                allowNull:true,
            }, 
            created_at:{
                type:Sequelize.DATE,
                allowNull:true,
            }, // 레코드의 insert 시점(날짜 시간)
        },{
            sequelize,
            timestamps:false, // 이 속성이 true이면, createdAt, updatedAt 필드를 자동생성합니다
            underscored:false, // 이 속성이 true이면, createdAt, updatedAt 필드의 이름이 created_at, update_at으로 바뀝니다.
            modelName:'User',
            tableName:'users',
            paranoid:false, // 이 필드가 true이면, deleteAt 필드가 생성됩니다. // 지운 척만 할 때
            charset:'utf8',
            collate:'utf8_general_ci',
            // createdAt : 레코드 insert된 시간
            // updatedAt : 레코드 수정 update된 시간
            // deletedAt : 레코드 삭제 시간 - 실제 데이터를 삭제하지 않고 시간만 기록
        });
    }
    // 테이블 간 관계 설정 함수
    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey:'commenter',sourceKey:'id'});
        // User 모델의 내용이 Comment 모델 다수의 레코드와 매칭되는 외래키 설정
        // User 모델의 id 필드를 Comment 모델에 commenter필드로 복사합니다.
    }
};