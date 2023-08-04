import pool from "../../database/database.js"
import { notFoundError } from "../../errors/not-found.erros.js"

async function getUserEmail(email) {
    const client = await pool.connect()

    try {
        const data = client.query(`SELECT * FROM "users" WHERE email=$1`, [email])
        return data
    } catch (error) {
        throw notFoundError()
    } finally {
        client.release()
    }
}

async function registerUser(name, phone, leaderRg, email, password) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const insertUserQuery = `INSERT INTO users (email, password, admin, professor) VALUES ($1, $2, $3, $4) RETURNING id`;
        const insertUserData = [email, password, false, false];

        const userInsertResult = await client.query(insertUserQuery, insertUserData);
        const userId = userInsertResult.rows[0].id;

        const insertPersonalDataQuery = `INSERT INTO personal_data ("userId", name, phone, leader_rg) VALUES ($1, $2, $3, $4)`;
        const insertPersonalData = [userId, name, phone, leaderRg];

        await client.query(insertPersonalDataQuery, insertPersonalData);
        await client.query("COMMIT");

        return userInsertResult.rows[0];

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

async function registerAdmin(email, password){
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const insertUserQuery = `INSERT INTO users (email, password, admin, professor) VALUES ($1, $2, $3, $4) RETURNING id`;
        const insertUserData = [email, password, true, false];
        await client.query(insertUserQuery, insertUserData);
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally{
        client.release();
    }
}

async function registerProfessor(email, password){
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const insertUserQuery = `INSERT INTO users (email, password, admin, professor) VALUES ($1, $2, $3, $4) RETURNING id`;
        const insertUserData = [email, password, false, true];
        await client.query(insertUserQuery, insertUserData);
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally{
        client.release();
    }
}

async function postSession(userId, token) {
    const client = await pool.connect()

    try {
        client.query("BEGIN")
        const data = await client.query(`INSERT INTO "session" ("userId", token) VALUES ($1,$2) RETURNING id`, [userId, token])
        await client.query("COMMIT")
        return {
            id: data.rows[0].id,
            userId,
            token
        }
    } catch (error) {
        await client.query("ROLLBACK")
    } finally {
        client.release()
    }
}

async function getSession(token){
    const client = await pool.connect()
    try {
        const data = await client.query(`SELECT * FROM "session" WHERE token=$1`, [token])
        return data.rows[0]
    } catch (error) {
        throw error;
    }finally{
        client.release()
    }
}


const userRepository = {
    getUserEmail,
    postSession,
    registerUser,
    registerAdmin,
    registerProfessor,
    getSession
}


export default userRepository