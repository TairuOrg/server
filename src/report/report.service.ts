import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ServerResponse, Report } from '@/types/api/types';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  async findAll(): Promise<ServerResponse<Report[]>> {
    const reports: Report[] = await this.prisma.reports.findMany({
      select: {
        id: true,
        admin_id: true,
        type: true,
        report_url: true,
        date: true,
      },
    });

    return {
      error: false,
      body: {
        message: 'Lista de los reportes del sistema',
        payload: reports,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
