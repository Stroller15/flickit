import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access Denied: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if(err) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        req.user = user as AuthUser;
    });
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
