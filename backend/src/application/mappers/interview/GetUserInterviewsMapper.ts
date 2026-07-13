import { Request } from "express";
import { GetUserInterviewsDTO } from "../../dtos/interview/GetUserInterviewsDTO";

export const mapToGetUserInterviewsDTO = (req: Request): GetUserInterviewsDTO => {

    return {

        userId: req.user.userId,

        page: req.query.page
            ? Number(req.query.page)
            : 1,

        limit: req.query.limit
            ? Number(req.query.limit)
            : 10,

    }
}