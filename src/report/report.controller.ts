import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/Interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimatedDto } from './dtos/get-estimate.dto';
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approve);
  }
  @Get()
  getEstimate(@Query() query: GetEstimatedDto) {
    return this.reportService.createEstimate(query);
  }
}
