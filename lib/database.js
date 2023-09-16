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

export async function newTestTransaction(queries) {

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
        const testArr = queries[1].values[0];
        
        for (let index = 0; index < testArr.length; index++) {
            values = [tests_ID, testArr[index]];
            await dbconnection.query(query, values); 
        }
    
    } catch (error) {
        await dbconnection.rollback();
        throw error;
    } finally {
        await dbconnection.commit(); 
        await dbconnection.end();
    }
}