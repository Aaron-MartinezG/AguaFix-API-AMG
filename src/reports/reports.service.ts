import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(dto: CreateReportDto, photoUrl: string): Promise<Report> {
    const report = this.reportRepository.create({ ...dto, photoUrl });
    return this.reportRepository.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException(`No existe un reporte con id ${id}`);
    }
    return report;
  }

  resolve(report: Report, repairPhotoUrl: string): Promise<Report> {
    report.isResolved = true;
    report.repairPhotoUrl = repairPhotoUrl;
    return this.reportRepository.save(report);
  }
}