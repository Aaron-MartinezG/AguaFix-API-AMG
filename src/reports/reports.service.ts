import { Injectable } from '@nestjs/common';
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

  create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(dto);
    return this.reportRepository.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }
}