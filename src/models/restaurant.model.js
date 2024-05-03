const Sequelize = require('sequelize');
const sequelize = require('../services/db.service');

const ENTITY_NAME = 'restaurant';
const Model = Sequelize.Model;

class Restaurant extends Model {}

Restaurant.init(
    {
        id: {
            type: Sequelize.STRING,
            notNull: true,
            primaryKey: true,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 4
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        site: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        lng: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: ENTITY_NAME,
    }
);

module.exports = Restaurant;