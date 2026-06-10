import { Request } from "express";

import { GetUserQuizzesDTO,} from "../../dtos/quiz/GetUserQuizzesDTO";

export const mapToGetUserQuizzesDTO = ( req: Request): GetUserQuizzesDTO => {

    return {
        userId:
            req.user.userId,

        page:
            Number(req.query.page) || 1,

        limit:
            Number(req.query.limit) || 10,
    };
};