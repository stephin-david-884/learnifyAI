export interface IGetDocumentViewerUrlUseCase {
    execute(userId: string, documentId: string): Promise<string>;
}