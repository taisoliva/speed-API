import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const {Pool} = pg

const configDataBase = {
    connectionString: process.env.DATABASE_URL
}

if(process.env.MODE === "prod") configDataBase.ssl = true;

const pool = new Pool(configDataBase);

pool.connect((err, client, done) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected to PostgreSQL database");
  done();
});

export default pool;