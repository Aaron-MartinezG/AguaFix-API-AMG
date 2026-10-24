import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';


const imageInterceptor = (fieldName: string) =>
  FileInterceptor(fieldName, {
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
  });

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(imageInterceptor('photo'))
  async create(
    @Body() dto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException('La foto de la fuga es obligatoria (campo "photo", tipo imagen)');
    }

    const photoUrl = await this.storageService.uploadFile(photo, 'reports');
    const report = await this.reportsService.create(dto, photoUrl);

    try {
      const html = generateReportTemplate(dto, photoUrl);
      await this.emailService.sendEmail(
        envs.MAINTENANCE_EMAIL,
        'AguaFix: Nueva fuga de agua reportada',
        html,
      );
    } catch (error) {
      console.error('No se pudo enviar el correo de aviso', error);
    }

    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  // la cuadrilla cierra el reporte subiendo la foto del trabajo terminado
  @Patch(':id/resolve')
  @UseInterceptors(imageInterceptor('repairPhoto'))
  async resolve(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() repairPhoto?: Express.Multer.File,
  ) {
    if (!repairPhoto) {
      throw new BadRequestException('La foto del trabajo terminado es obligatoria (campo "repairPhoto", tipo imagen)');
    }
    const report = await this.reportsService.findOne(id); // 404 si no existe, antes de subir nada
    const repairPhotoUrl = await this.storageService.uploadFile(repairPhoto, 'repairs');
    return this.reportsService.resolve(report, repairPhotoUrl);
  }
}