import fs from "fs";
import { Request, Response, NextFunction } from "express";

export default function logger(fileName : string){
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.url != "/favicon.ico"){
            fs.appendFile(
                fileName,
                `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
                (err) => {
                    console.error(`Error while logging: ${err?.message}`);
                    next();
                }
            );
        }
    }
};