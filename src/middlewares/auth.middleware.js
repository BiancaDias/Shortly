import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);
    try{
        const user = await db.query(`SELECT * FROM registered WHERE token = $1;`, [token])
        if(user.rowCount === 0) return res.sendStatus(401);
        res.locals.userFind = user.rows[0];
        next()
    }catch(err){
        res.status(500).send(err);
    }
}
