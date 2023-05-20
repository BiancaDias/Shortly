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
        if(ver.rowCount === 0) return res.sendStatus(401);
        const verPassword = bcrypt.compareSync(password, ver.rows[0].password);
        if(!verPassword) return res.sendStatus(401);

        const token = uuid();

        await db.query(`INSERT INTO registered ("idUser", token) VALUES ($1, $2);`, [ver.rows[0].id, token])
        const bodyToken = {token: token}
        res.status(200).send(bodyToken);
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function usersMe(req, res){
    const userFind = res.locals.userFind;
    try{
        const linksUser = await db.query(`SELECT * FROM urls WHERE "userId" = $1;`,[userFind.idUser]);
        const user = await db.query(`SELECT * FROM users WHERE id = $1;`, [userFind.idUser])
        const visits = await db.query(`SELECT SUM(visits) AS totalVisits FROM urls WHERE "userId" = $1;`, [userFind.idUser]);

        const links = linksUser.rows.map((l) =>({
            id: l.id,
            shortUrl: l.url_shortly,
            url: l.url_original,
            visitCount: l.visits

        }))

        const body = {
            id: userFind.idUser,
            name: user.rows[0].name,
            visitCount: visits.rows[0].totalvisits,
            shortenedUrls: links
        }
        return res.status(200).send(body)

    }catch (err) {
        res.status(500).send(err.message);
    }
}