const async_handler = require('express-async-handler');
const uuid = require('uuid');
const {pick} = require('lodash');
const { Restaurant } = require('../models');
const { Sequelize } = require('sequelize');

/**
 * Get all restaurants from the database
 * @returns {Promise<Array>} - A promise that resolves to an array of all restaurants in the database
*/
exports.getRestaurants = async_handler(async (req, res) => {
    const query = req.query;
    // Will only pick the fields that are allowed to be set by the user
    const pickedFields = pick(query, [
        'rating',
        'name',
        'site',
        'email',
        'phone',
        'street',
        'city',
        'state',
        'lat',
        'lng',
    ]);
    const restaurants = await Restaurant.findAll({
        where: pickedFields,
    });
    return res.send(restaurants);
});

/**
 * Get a restaurant by its ID
 */
exports.getRestaurantById = async_handler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
        return res.status(404).send({
            message: `Restaurant with ID ${id} not found`,
        });
    }

    return res.send(restaurant);
});

/**
 * Create a new restaurant
 * @param {Object} restaurant - The restaurant to create
 * @returns {Promise<Object>} - A promise that resolves to the created restaurant
 */
exports.createRestaurant = async_handler(async (req, res) => {
    // Will only pick the fields that are allowed to be set by the user
    const pickedBody = pick(req.body, [
        'rating',
        'name',
        'site',
        'email',
        'phone',
        'street',
        'city',
        'state',
        'lat',
        'lng',
    ]);
    const restaurant = await Restaurant.create({
        id: uuid.v4(),
        ...pickedBody,
    });
    return res.send(restaurant);
});

/**
 * Update a restaurant by its ID
 * @param {number} id - The ID of the restaurant to update
 * @param {Object} restaurant - The updated restaurant
 * @returns {Promise<Object>} - A promise that resolves to the updated restaurant
 */
exports.updateRestaurant = async_handler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
        return res.status(404).send({
            message: `Restaurant with ID ${id} not found`,
        });
    }
    // Will only pick the fields that are allowed to be set by the user
    const pickedBody = pick(req.body, [
        'rating',
        'name',
        'site',
        'email',
        'phone',
        'street',
        'city',
        'state',
        'lat',
        'lng',
    ]);

    Object.keys(pickedBody).forEach((key) => {
        restaurant[key] = pickedBody[key];
    });
    await restaurant.update(pickedBody);
    return res.send(restaurant);
});

/**
 * Delete a restaurant with the given ID
 * @param {number} id - The ID of the restaurant to delete
 * @returns {Promise<Object>} - A promise that resolves to the deleted restaurant
 */
exports.deleteRestaurant = async_handler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
        return res.status(404).send({
            message: `Restaurant with ID ${id} not found`,
        });
    }
    await restaurant.destroy();
    return res.send(restaurant);
});

/**
 * Gets the restaurants that are inside the given radius from the given coordinates
 * @param {number} latitude - The latitude of the coordinates
 * @param {number} longitude - The longitude of the coordinates
 * @param {number} radius - The radius in meters
 * @returns {Promise<Array>} - The restaurants that are inside the given radius from the given coordinates
 */
exports.getStatistics = async_handler(async (req, res) => {
    const {latitude, longitude, radius} = req.query;
    if (!latitude || !longitude || !radius) {
        res.status(400).send({
            message: 'Latitude, longitude, and radius are required',
        });
    }

    const restaurants = await Restaurant.findAll({
        where: Sequelize.literal(`ST_DISTANCE_SPHERE(POINT(${longitude}, ${latitude}), POINT(lng, lat)) <= ${radius}`),
    });

    const count = restaurants.length;
    const avg = restaurants.reduce((acc, restaurant) => acc + restaurant.rating, 0) / count;
    const std = Math.sqrt(restaurants.reduce((acc, restaurant) => acc + Math.pow(restaurant.rating - avg, 2), 0) / count);

    return res.send({
        count,
        avg,
        std,
    })
});
