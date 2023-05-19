import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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
        if (err.code === '23505' && err.constraint === 'users_email_key') {
            res.status(409).send('E-mail already exists');
          } else {
            res.status(500).send(err.message);
          }
    }
}

export async function singIn(req, res){
    const { email, password } = req.body;
    try{
        const ver = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if(!ver) return res.sendStatus(401)
    }catch (err) {
        res.status(500).send(err.message);
    }
}