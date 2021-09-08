/**
 * @description 数据类型封装
 */

const Sequelize = require('sequelize')


module.exports = {
    STRING:Sequelize.STRING,
    INTEGER : Sequelize.INTEGER,
    DECIMAL : Sequelize.DECIMAL,
    BOOLEAN:Sequelize.BOOLEAN,
    TEXT:Sequelize.TEXT
}

