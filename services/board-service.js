const e = require("express");
const db = require("../sequelize/models/index"); //db모듈 가져옴
const Op = db.Sequelize.Op;


// module.exports = { 얘는 콜백
//     totalRows: function() {
//         db.Board.count()
//             .then((result) => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err.messsage);
//                 throw err;//가급적 이렇게 처리하는게 나음 에러를 호출한쪽으로 던짐
//             });
//     }
// };//이게 서비스 객체


module.exports = {
    totalRows: async function(searchMethod) {
        try {
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "btitle"){
                    where = {
                        "btitle": {
                            [Op.like]: "%" + searchMethod.keyword + "%"
                        }
                    }
                }else {
                    where = {
                        [Op.or]: [
                            { "btitle": {[Op.like]: "%" + searchMethod.keyword + "%" }},
                            { "bcontent": {[Op.like]: "%" + searchMethod.keyword + "%" }}
                        ]
                    }
                }
            }
            const result = await db.Board.count({
                where
            });
            return result;
        } catch(error) {
            throw(error);
        }
    },

    list: async function(pager, searchMethod) {
        try {
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "btitle"){
                    where = {
                        "btitle": {
                            [Op.like]: "%" + searchMethod.keyword + "%"
                        }
                    }
                }else {
                    where = {
                        [Op.or]: [
                            { "btitle": {[Op.like]: "%" + searchMethod.keyword + "%" }},
                            { "bcontent": {[Op.like]: "%" + searchMethod.keyword + "%" }}
                        ]
                    }
                }
            }
            const result = await db.Board.findAll({
                attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
                where,
                order: [["bno", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            });
            return result;
        } catch (error) {
            throw(error);
        }
    },

    rangeList: async function(startBno, endBno) {
        try {
            const result = await db.Board.findAll({
                attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
                where: {
                    [Op.and]: [
                        {"bno":{[Op.gte]: startBno}}, 
                        {"bno":{[Op.lte]:endBno}}
                    ]
                }
            });
            return result;
        } catch (error) {
            throw(error);
        }
    },

    getBoard: async function(bno) {
        try {
            const board = db.Board.findOne({
                where: {bno}
            });
            return board;
        } catch (error) {
            throw error;
        }
    },

    create: async function(board) {
        try {
            const dbBoard = await db.Board.create(board);
            return dbBoard
        } catch (error) {
            throw error;
        }
    },

    update: async function(board) {
        try {
            const rows = await db.Board.update({
                btitle: board.btitle,
                bcontent: board.bcontent
            }, { where: {bno: board.bno} });
            return rows
        } catch (error) {
            throw error;
        }
    },

    delete: async function(bno) {
        try {
            const rows = await db.Board.destroy({ where: {bno} });
            return rows
        } catch (error) {
            throw error;
        }
    },

    getUserAndBoard: async function(userid) {
        try {
            //방법1
            // const user = await db.User.findOne({
            //     where: {userid},
            //     include: [{
            //         model: db.Board,
            //         where: {
            //             bno: {[Op.lte]: 5}//5이하
            //         }     
            //     }]
            // });
            // return user;

            //방법2
           const user = await db.User.findOne({
                where: {userid},
            });
            user.dataValues.Boards = await user.getBoards({
                where: {
                    bno: {[Op.lte]: 5}//5이하
                }     
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

};//이게 서비스 객체

// where: {//조건
//     //bno >= 1 and bno <= 5
//     [Op.and]: { bno: { [Op.gte]: 1 }, bno: { [Op.lte]: 5 } }
// }
