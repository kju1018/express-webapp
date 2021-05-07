const { Model, Sequelize } = require("sequelize");//sequelize라는 모듈에서 Model, Sequelize를 사용하겠다.

module.exports = (sequelize, DataTypes) => {
    //모델 클래스 선언
    class Board extends Model {
        // static init({}) 이렇게 작성해도됨
        static associate(models) {
            models.Board.belongsTo(models.User, {foreignKey:"bwriter", targetKey:"userid"});
        }
    }
    //DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의
    Board.init({//이건 extends Model이 갖고있는 정적메소드, 재정의 하겠다는 뜻
        bno:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        btitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bcontent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bwriter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        bhitcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        battachoname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        battachsname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        battachtype: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "Board",//이게 index의 model.name
        tableName: "boards",
        timestamps: false, //createAt과 updateAt 컬럼을 사용 안함
    })//왜 이닛을 만드냐

    //모델클래스 리턴
    return Board;
};




