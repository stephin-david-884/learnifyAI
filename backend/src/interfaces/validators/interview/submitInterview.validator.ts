import { z } from "zod";

export const submitInterviewSchema =
    z.object({
        answers:

            z.array(

                z.object({

                    questionIndex:

                        z.number()
                            .int()
                            .min(0),

                    transcript:

                        z.string()
                            .trim()
                            .min(1)
                            .max(10000),

                })

            )

                .min(1),
    })