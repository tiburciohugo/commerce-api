import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        res.status(200).json({
            message: "Hello you reached the products endpoint"
        });
    } catch (error) {
        console.error(error);
    }
    return
}