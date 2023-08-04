import pool from "../../database/database.js"

async function getNameUser(userId){

    const client = await pool.connect()

    try {
        const data = await client.query(`SELECT pd.name FROM personal_data pd WHERE "userId" = $1`, [userId])
        return(data.rows[0].name)
    } catch (error) {
        throw error;
    } finally {
        client.release()
    }
}

async function student(userId) {

    const client = await pool.connect()
    const name = await getNameUser(userId)

    try {
        const query = `SELECT 'fe' AS aula, f."userId", p.name AS professor_name, f."createdAt"
                        FROM fe f
                        JOIN professors p ON f."professor" = p.id
                        WHERE f."userId" = $1
                        UNION ALL
                        SELECT 'imersao' AS aula, i."userId", p.name AS professor_name, i."createdAt"
                        FROM imersao i
                        LEFT JOIN professors p ON i."professor" = p.id
                        WHERE i."userId" = $1
                        UNION ALL
                        SELECT 'arrependimento' AS aula, a."userId", p.name AS professor_name, a."createdAt"
                        FROM arrependimento a
                        LEFT JOIN professors p ON a."professor" = p.id
                        WHERE a."userId" = $1
                        UNION ALL
                        SELECT 'salvacao' AS aula, s."userId", p.name AS professor_name, s."createdAt"
                        FROM salvacao s
                        LEFT JOIN professors p ON s."professor" = p.id
                        WHERE s."userId" = $1;`
        
        const data = await client.query(query, [userId])
        const classes = data.rows.map(item => ({
            aula:item.aula,
            professor: item.professor_name,
            createdAt: item.createdAt
        }))

        const result = {name,
                        classes}

        console.log(result)
        
    } catch (error) {
        throw error;
    } finally {
        client.release()
    }

}

const studentRepository = {
    student
}

export default studentRepository