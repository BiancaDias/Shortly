import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';


export async function shorten(req, res){
    const userFind = res.locals.userFind;
    const { url } = req.body
    try{
        const shortId = nanoid(8);
        await db.query(`INSERT INTO urls ("userId", url_original, url_shortly) VALUES ($1, $2, $3);`, [userFind.idUser, url, shortId])
        console.log(userFind)
        const body = {
            id: userFind.idUser,
            shortUrl: shortId
        }
        res.status(201).send(body)
    }catch(err){
        res.status(500).send(err);
    }
}