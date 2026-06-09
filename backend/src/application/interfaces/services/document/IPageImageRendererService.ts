export interface IPageImageRendererService {

    renderPage(pdfBuffer: Buffer, pageNumber: number): Promise<Buffer>;
}