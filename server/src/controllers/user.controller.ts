import { Request, Response } from "express"
import { prisma } from "../config/db.js"

export const getUser = async(req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req?.user?.email
            }
        })
        return res.json({
            message: "success"
        })
    } catch (error) {
        return res.json({
            error
        })
    }
}