import { GoogleGenerativeAI } from "@google/generative-ai";
import { IImageAnalysisService } from "../../../application/interfaces/services/ai/IImageAnalysisService";

export class GeminiVisionService implements IImageAnalysisService {

    private readonly _model;

    constructor() {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        this._model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", })
    }

    async analyzePageImage(imageBuffer: Buffer): Promise<string | null> {

        const prompt = `
            You are analyzing a page from an educational PDF.

            Your task is to extract educational visual information.

            Include:

            - Architecture diagrams
            - UML diagrams
            - ER diagrams
            - Flowcharts
            - Charts
            - Graphs
            - Technical illustrations
            - Tables

            Ignore:

            - Logos
            - Decorative images
            - Watermarks
            - Profile photos

            Return a structured textual description suitable for semantic search.

            For diagrams:
            - Describe components
            - Describe relationships
            - Describe data flow

            For tables:
            - Describe columns
            - Describe rows
            - Describe key values

            For charts:
            - Describe trends
            - Describe axes
            - Describe conclusions

            If no meaningful educational visual content exists, return exactly:

            NO_RELEVANT_VISUAL_CONTENT
        `;

        const result = await this._model.generateContent([
            prompt,
            {
                inlineData: {
                    data:
                        imageBuffer.toString("base64"),

                    mimeType:
                        "image/png",
                },
            },
        ]);

        const response = result.response.text().trim();

        if (
            response.includes("NO_RELEVANT_VISUAL_CONTENT")
        ) {
            return null;
        }

        return response;
    }
}