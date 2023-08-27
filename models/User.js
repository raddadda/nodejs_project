const {DataTypes} = require('sequelize');
//const { sequelize } = require('.');

const Model = (sequelize) => {
    return sequelize.define('member',{
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true,
            autoIncrement : true,
        },
        userid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'asdf',//기본값
        },
        pw: {
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        name: {
            type:DataTypes.STRING(255),
            allowNull:false,
        },
    });
};

module.exports = Model;