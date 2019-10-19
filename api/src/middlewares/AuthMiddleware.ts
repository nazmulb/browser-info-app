import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header("auth_token");
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch (e) {
            throw new UnauthorizedException("Missing or invalid auth token");
        }
    }
}
