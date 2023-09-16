import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });


    try {
        const [results] = await dbconnection.execute(query, values);
        dbconnection.end();
        return results;        
    } catch (error) {
        throw Error(error.message);
    }
}

export async function transaction(queries) {

    const dbconnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
    
    await dbconnection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await dbconnection.beginTransaction();

    try {
        let { query, values } = queries[0];
        const results = await dbconnection.query(query, values);

        const tests_ID = results[0].insertId;

        query = queries[1].query;
        values = queries[1].values;
        values.unshift(tests_ID);
        console.log(values);

        await dbconnection.query(query, values);
    
    } catch (error) {
        await dbconnection.rollback();
        throw error;
    }

    await dbconnection.commit(); 
    await dbconnection.end();
}