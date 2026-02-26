import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "No authorization token provided" });
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  if (!process.env.ACCESS_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET) as any;

    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
