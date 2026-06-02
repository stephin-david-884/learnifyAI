export interface IAIService {

    generateAnswer(question: string, context:string): Promise<string>;
}