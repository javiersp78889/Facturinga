import { Module } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';


@Module({
  providers: [GeneratePdfService],
  exports:[GeneratePdfService],
})
export class GeneratePdfModule {}
