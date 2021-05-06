const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Board extends Model {

        static associate(models) {

        }
    }

    Board.init({
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
        modelName: "Board",
        tableName: "boards",
        timestamps: false, //createAt과 updateAt 컬럼을 사용 안함
    });


    return Board;
}