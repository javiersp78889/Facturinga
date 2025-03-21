import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateGeneratePdfDto } from './dto/create-generate-pdf.dto';
import puppeteer from 'puppeteer';


@Injectable()
export class GeneratePdfService {

  async generatePDF(id: number, data: CreateGeneratePdfDto,ruc:string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 📝 HTML con estilos CSS
    const htmlContent = `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #007bff; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #007bff; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
    </head>
    <body>

        <header>
          <h1>Factura Generada</h1>

          <p>Nombre:${data.name}</br>
          Cédula:${data.cedula}</br>
          RUC:${ruc}</br>

          </p></br>
           <table>
              <tr>
                <th>Motivo</th>
              </tr>
               <tr>
                    <td>${data.motivo}</td>
                 </tr>   
            </table>
        </header>
        <table>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
            
            ${data.items.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>$${item.price.toFixed(2)}</td>
                </tr>
            `).join('')}
        </table>
    </body>
    </html>`;

    await page.setContent(htmlContent);

    const publicPath = path.join(__dirname, '../public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    const filePath = path.join(publicPath, `${id}.pdf`);
    await page.pdf({ path: filePath, format: 'A4' });


    await browser.close();
    return filePath;
  }

}
