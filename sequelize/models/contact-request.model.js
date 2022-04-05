const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('contact_request', {
        id: {
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

        subject: {
            type: DataTypes.STRING
        },

        message: {
            type: DataTypes.STRING
        }
    },
        {
            indexes: [
                {
                    fields: ['email']
                }]
        })
}