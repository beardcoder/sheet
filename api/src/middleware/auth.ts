import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  verify(
    token,
    process.env.TOKEN_KEY as string,
    (err: any, tokenDecoded: any) => {
      if (err) return res.status(401).json(err);

      req.tokenDecoded = tokenDecoded;

      next();
    }
  );
};

export default verifyToken;
