import { Response } from "express";
import { ApiResponse } from "../../types/response";

export const sendSuccess = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        ...(data !== undefined && { data }),
    };

    return res.status(statusCode).json(response);
};

// export const sendError = (
//     res: Response,
//     statusCode: number,
//     message: string,
//     error?: unknown
// ) => {
//     const response: ApiResponse = {
//         success: false,
//         message,
//         ...(error && { error }),
//     };

//     return res.status(statusCode).json(response);
// };