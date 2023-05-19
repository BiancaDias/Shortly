import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signUp(req, res){
    const { name, email, password, confirmPassword } = req.body;

    if(password !==confirmPassword){
        return res.sendStatus(422);
    }
    const hash = bcrypt.hashSync(password, 10)
    try{
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);
        res.sendStatus(201);
    }catch (err) {
        res.status(500).send(err.message);
    }
}