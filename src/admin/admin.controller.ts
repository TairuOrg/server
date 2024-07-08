import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { decryptSessionCookie } from '@/auth/lib';
import { CustomerId, UpdateCustomerData, Item, UpdateItem, NotificationData, Entry, getStatisticsData } from '@/types/api/types';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  async getAdminInfo(@Req() req: Request) {
    
    const session_token = req.headers.cookie?.split('=')[1];
    console.log('session_token:', session_token)
    const [e, sessionParsed] = await decryptSessionCookie(session_token);
    if (e) return e;

    return await this.adminService.getAdminInfo(sessionParsed.id as number);
  }

  @Get('cashier-status')
  async cashierStatus(@Req() req: Request) {
    return this.adminService.getCashierStatus();
  }

  @Get('items-and-categories')
  async itemsAndCategories(@Req() req: Request) {
    return this.adminService.getItemsAndCategoriesCount();
  }

  @Get('todays-revenue')
  async todaysRevenue(@Req() req: Request) {
    return this.adminService.getTodaysRevenue();
  }

  @Get('convert-amount')
  async convertExchange(@Req() req: Request) {
    return this.adminService.convertExchange(2);
  }

  @Get('get-items')
  async getItems(@Req() req: Request) {
    return this.adminService.getItems();
  }

  @Get('get-reports')
  async getReports(@Req() req: Request) {
    return this.adminService.getReports();
  }

  @Get('get-cashiers')
  async getCashiers(@Req() req: Request) {
    return this.adminService.getCashiers();
  }

  @Post('delete-cashier')
  async deleteCashier(@Body() personal_id: CustomerId, @Res() res: Response) {
    return this.adminService.deleteCashier(personal_id, res);
  }
  
  @Get('get-sales')
  async getSales(@Req() req: Request) {
    return this.adminService.getSales();
  }

  @Get('get-customers')
  async getCustomers(@Req() req: Request) {
    return this.adminService.getCustomers();
  }
  

  @Post('client-data-validation')
  async clientDataValidation(@Body() data: UpdateCustomerData, @Res() res: Response) {
    const response = await this.adminService.clientDataValidation(data, res);
    return response;
  }

  @Post('client-update')
  async clientUpdate(@Body() data: UpdateCustomerData, @Res() res: Response) {
    const response = await this.adminService.clientUpdate(data, res);
    return response;
  }

  @Post('client-delete')
  async deleteCustomer(@Body() personal_id: CustomerId, @Res() res: Response) {
    const response = await this.adminService.deleteCustomer(personal_id, res);
    return response;
  }

  @Post('update-item')
  async updateItem(@Body() data: UpdateItem, @Res() res: Response) {
    console.log(data)
    const response = await this.adminService.updateItem(data, res);
    return response;
  }

  @Post('insert-notification')
  async validateNotification(@Body() data: NotificationData, @Res() res: Response) {
    const response = await this.adminService.insertNotification(data, res);
    return response;
  }

  @Get('get-notifications')
  async getNotifications(@Req() req: Request) {
    return this.adminService.getNotifications();
  }

  @Get('get-entries') 
  async getEntries(@Req() req: Request) {
    return this.adminService.getEntries();
  }

  @Post('insert-entry')
  async insertEntry(@Body() data: Entry, @Res() res: Response) {
    console.log(data)
    const response = await this.adminService.insertEntry(data, res);
    return response;
  }

  // @Post('validate-entries')
  // async validateEntry(@Body() data: any, @Res() res: Response) {
  //   return this.adminService.validateEntry(data, res);
  // }

  @Post('validate-entry') 
  async validateEntry(@Body() data: Entry, @Res() res: Response) {
    const response = await this.adminService.validateEntry(data, res);
    return response;
  }

  @Post('get-statistics')
  async getStatistics(@Body() data: getStatisticsData, @Res() res: Response) {
    console.log("yeehaw",data)
    const response = await this.adminService.getStatisics(data, res);
    return response;
  }

  @Get('get-dashboard-data')
  async getDasboardData(@Req() req: Request) {
    const response = await this.adminService.getDasboardData();
    return response;
  }

  @Get('backup-database') 
  async backupDatabase(@Req() req: Request, @Res() res: Response) {
    try {
      const backupName = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-').replace(/T/g, '-').replace(/Z/g, '') + '.sql';
      const filename = await this.adminService.backupDatabase(backupName);
      const strFileName = filename.toString();
      const filePath = path.join(__dirname, '..', '..', '..', strFileName);

      // res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/octet-stream');
      // res.download(filePath, (err) => {console.error(err)});
      res.sendFile(filePath, (err) => {console.error("yippie",err)});
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error('Error during file download:', error);
      res.status(500).send('Error during file download');
    }
  }

  // @Post('restore-database')
  // async restoreDatabase(@Body() url: String, @Req() req: Request) {
  //   return this.adminService.restoreDatabase("test3.sql");
  // }

  
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const uploadPath = path.join(__dirname, '..','..','..', file.originalname);

  //   fs.writeFile(uploadPath, file.buffer, (err) => {
  //     if (err) {
  //       console.error('Error writing file:', err);
  //       throw new Error('Error writing file');
  //     } else {
  //       console.log('File successfully saved:', uploadPath);
  //     }
  //   });

  //   console.log(file);
  // }


}
