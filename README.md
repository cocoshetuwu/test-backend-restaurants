Test API for BackEnd Developer position

How to install and run the project:
1.- Execute yarn install or npm install to install the neccesary modules for the project
2.- Create a database schema (the project use MySQL) for this project e.g. restaurants-db
3.- Create an environment file named .env to assign the following values
    - PORT: The port to run the API process (e.g. 3000) Note: By Default the API runs on port 3000
    - DB_HOST: The host for the database service (e.g. localhost)
    - DB_USER: The user for the database authentication (e.g. root)
    - DB_PASS: Tue user's password for the database authentication (e.g. root)
    - DB_NAME: The name for the database schema created(e.g. restaurants)
    - DB_PORT: The port where MySQL service is running (e.g. 3306)
    - DB_LOG: If true, the console will print the queries used for sequelize operations (e.g. false)
4.- Start the process with yarn start or npm start

Note: All the data on the database will be truncated and initialized with the "restaurantes.csv" file registers on the data folder when the API restarts