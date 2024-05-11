import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    public getAdminDashboard(): string {
        return 'jola admin dashboard';
    }
}
