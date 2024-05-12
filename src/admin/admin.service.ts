import { Administrators } from './../models/entities/Administrators';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Administrators)
    private readonly adminRepository: Repository<Administrators>,
  ) {}
  public getAdminDashboard(): string {
    return '';
  }
  public createAdmin(): string {
    return ' admin created';
  }
  public getAdminInfo(): string {
    return ' admin info';
  }
  public getAllAdmins(): Promise<Administrators[]> {
    return this.adminRepository.createQueryBuilder('administrators').getMany();
  }
}
