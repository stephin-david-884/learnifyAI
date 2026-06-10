import { z } from "zod";

export const submitQuizSchema =
    z.object({

        answers:
            z.array(
                z.object({

                    questionIndex:
                        z.number(),

                    selectedAnswer:
                        z.string()
                            .min(1),

                })
            )
                .min(1),
    });