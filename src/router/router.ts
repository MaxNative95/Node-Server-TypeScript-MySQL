import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `SELECT * FROM Heroes`;
    MySql.ejecutarQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroes
            })
        }

    });

});


router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const escapedId = MySql.instance.cnn.escape(id);

    const query = `SELECT * FROM Heroes WHERE id = ${escapedId}`;
    MySql.ejecutarQuery(query, (err: any, heroe: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                heroe : heroe[0]
            })
        }

    });

});


export default router