import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createFacturaDto: CreateFacturaDto) {
    const userId = req.user?.id;
    return this.facturaService.create(createFacturaDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const id = req.user?.id;
    return this.facturaService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(+id, updateFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(+id);
  }
}
