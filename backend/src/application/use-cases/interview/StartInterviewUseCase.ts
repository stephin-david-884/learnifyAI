import { AppError } from "../../../domain/errors/AppError";

import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";

import { statusCode } from "../../constants/enums/statusCode";

import { interviewMessages } from "../../constants/messages/interviewMessages";

import { StartInterviewDTO } from "../../dtos/interview/StartInterviewDTO";

import { StartInterviewResponseDTO } from "../../dtos/interview/StartInterviewResponseDTO";

import { IStartInterviewUseCase } from "../../interfaces/usecases/interview/IStartInterviewUseCase";

export class StartInterviewUseCase
    implements IStartInterviewUseCase {

    constructor(

        private readonly _interviewRepository: IInterviewRepository

    ) {}

    async execute(
        data: StartInterviewDTO
    ): Promise<StartInterviewResponseDTO> {

        const interview =
            await this._interviewRepository
                .findByUserAndId(
                    data.userId,
                    data.interviewId
                );

        if (!interview) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_FOUND, statusCode.NOT_FOUND
            );
        }

        if (interview.status === "COMPLETED") {

            throw new AppError(interviewMessages.error.INTERVIEW_ALREADY_COMPLETED, statusCode.BAD_REQUEST);
        }

        if (
            interview.status ===
            "IN_PROGRESS"
        ) {

            throw new AppError(interviewMessages.error.INTERVIEW_ALREADY_STARTED, statusCode.BAD_REQUEST);
        }

        if (
            interview.status !==
            "READY"
        ) {

            throw new AppError(interviewMessages.error.INTERVIEW_NOT_READY, statusCode.BAD_REQUEST);
        }

        interview.startInterview();

        await this._interviewRepository.save(
            interview
        );

        return {

            interviewId:
                interview.getId(),
        };
    }
}