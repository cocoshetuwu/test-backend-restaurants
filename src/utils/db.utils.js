const csvToJson = require('convert-csv-to-json');
const path = require('path');
const {Restaurant} = require('../models');

/**
 * Seed the database with the data from the CSV file
 * @returns {Promise<void>} A promise that resolves when the database is seeded
 */
const seedDatabase = async () => {
    const data = csvToJson.supportQuotedField(true).fieldDelimiter(',').getJsonFromCsv(path.join(__dirname, '../data/restaurantes.csv'));
    await Restaurant.bulkCreate(data);
}

module.exports = {
    seedDatabase,
};
