const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('download_request', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        resource: {
            type: DataTypes.STRING
        },

        downloadLink: {
            type: DataTypes.STRING,
            defaultValue: ''
        },

        hash: {
            type: DataTypes.STRING
        },

        pending: {
            defaultValue: false,
            type: DataTypes.BOOLEAN
        },

        approved: {
            defaultValue: true,
            type: DataTypes.BOOLEAN
        },

        count: {
            defaultValue: 0,
            type: DataTypes.INTEGER
        },

        // userId: {
        //     allowNull: true,
        //     type: DataTypes.INTEGER
        // }
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['hash']
                }]
        })
}