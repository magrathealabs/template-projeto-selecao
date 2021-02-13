import { Request, Response, NextFunction } from "express";
const has = require('has-keys');

export const hasQueryCode = (req: Request, res: Response, next: NextFunction) => {
   has(req.query, ['code']) ? next() : res.status(400).send({error: 'missing github login code'}); 
} 
