# USING DATABASES

## Setup
- How to talk to databases
    1. create a database
        - `psql`
        - `CREATE DATABASE database_name`
    2. create `client` variable
        - `const client = new pg.Client(process.env.DATABASE_URL)`
    3. add .env file with a DATABASE_URL
        - `DATABASE_URL = postgres://localhost5432/database_name`
    4. create a schema.sql file
        - this file creates a table within the database you connect to
        ```
        DROP TABLE IF EXISTS table_name
        
        CREATE TABLE table_name (
            column1 datatype,
            column1 datatype,
            column1 datatype,
            column1 datatype,
        );
        ```
      
    5. connect server to database
        - psql -f schema.sql -d database_name
        - will create the table
    6. in server.js
        - `client.on('error', err () => {throw err;})`
        - ```client.connect()
            .then( () => {
                app.listen(PORT, () => {
                    console.log(PORT)
                    console.log(client.connectionParameters.database)```
    7. PARTS TO MAKE A REQUEST TO THE DATABASE
        - SQL variable: should contain a SQL statement
        - safeValues variable: should contain values you want to insert into the SQL statement
        - client.query(SQL, safeValues)

## TIPS/Thinking
- How to check herokuapp database
`heroku pg:psql --app app_name_here`
- `\dt` shows tables/relations
- `\l\` shows databases
- `\c database_name` connects to specified database
- while in database. you can type in SQL statements here. END WITH A `;`
- when Selecting a row, use `value.rowCount === 0` or `value.rowCount > 0` to determine if data has been retrieved
- `console.log(value)` from the database response to see what the response LOOKS LIKE
- `heroku pg:psql -f path/to/schema.sql --app your-heroku-app-name-here` creates database on heroku app
    - in heroku app. need to add free postgress to allow databases
    - connect to heroku database app via terminal: `heroku pg:psql --app appNameHere`
    - `heroku pg:push booklistapp DATABASE_URL --app jdd-trt-booklist`
`
