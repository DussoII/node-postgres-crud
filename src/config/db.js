import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.DB_PORT
})

pool.on("connect", () =>{
    try{
        console.log("Sucesso!")
    }catch(error){
        console.log("erro = ", error)
    }
})

export default pool;