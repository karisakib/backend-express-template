import express from "express";
import { Request, Response, Router } from "express";

const router: Router = express.Router();

interface DTO {
 name: string,
 email: string,
 password: string
}

// Path: /api/v1/users/
router.get('/', (req: Request<{}, {}, DTO>, res: Response) => {
 let data = req.body.email
 res.json({});
});


export { router };