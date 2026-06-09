export interface IImageAnalysisService {

    analyzePageImage(imageBuffer: Buffer): Promise<string | null>;
}