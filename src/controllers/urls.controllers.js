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

export async function urlsId(req, res){
    const { id } = req.params;
    try{
        const url = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if(url.rowCount === 0) return res.sendStatus(404);
        const body = {
            id: url.rows[0].id,
            shortUrl: url.rows[0].url_shortly,
            url: url.rows[0].url_original
        }
        res.status(200).send(body)
    }catch(err){
        res.status(500).send(err);
    }
}

export async function openUrl(req, res){
    const { shortUrl } = req.params;
    try{
        const url = await db.query(`SELECT * FROM urls WHERE url_shortly = $1;`, [shortUrl]);
        if(url.rowCount === 0) return res.sendStatus(404);

        await db.query(`UPDATE urls SET visits = visits + 1 WHERE url_shortly = $1;`, [shortUrl])
        res.redirect(url.rows[0].url_original);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function deleteUrl(req, res){
    const userFind = res.locals.userFind;
    const { id } = req.params;
    try{
        const url = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if(url.rowCount === 0) return res.sendStatus(404);

        if(url.rows[0].userId !== userFind.idUser) return res.sendStatus(401);
        
        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);

        res.sendStatus(204);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function getRanking(req, res){
    try{
        const ranking = await db.query(`
            SELECT u.id, u.name, COUNT(urls.id) AS "linksCount", COALESCE(SUM(urls.visits), 0) AS "visitCount"
            FROM users u
            LEFT JOIN urls ON u.id = urls."userId"
            GROUP BY u.id, u.name
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `)
        res.status(200).send(ranking.rows);
    }catch(err){
        res.status(500).send(err);
    }
}