import { Request } from "express";
import { GetChatHistoryDTO } from "../../dtos/chat/GetChatHistoryDTO";

export const mapToGetChatHistoryDTO = (req: Request): GetChatHistoryDTO => {

    const documentId = Array.isArray(req.params.documentId)
        ? req.params.documentId[0]
        : req.params.documentId;

    return {
        userId: req.user.userId,
        documentId,
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 20),
    }
}