const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            defaultValue: 0,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        name: {
            type: DataTypes.STRING,
            validate: {

                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                len: {
                    args: [4, 32],
                    msg: "String length is not in this range"
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                is: {
                    args: ["^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", 'i'],
                    msg: "Only emails allowed"
                },
                len: {
                    args: [4, 32],
                    msg: "String length is not in this range"
                }
            }
        },

        country: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                }
            }
        },

        company: {
            type: DataTypes.STRING
        },

        interest: {
            type: DataTypes.STRING
        },

        removed: {
            defaultValue: false,
            type: DataTypes.BOOLEAN
        },
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                }]
        })
}