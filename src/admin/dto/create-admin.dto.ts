import { Entry } from '@/types/db/entry.interface';
import { Report } from '@/types/db/report.interface';
import { SentNotification } from '@/types/db/sentNotifications.interface';

interface AdministratorDTO {
  id: number;
  personalId: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
  residenceLocation: string;
}
export class CreateAdminDto {
  id: number;
  personalId: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
  residenceLocation: string;

  constructor(dto: AdministratorDTO) {
    this.id = dto.id;
    this.personalId = dto.personalId;
    this.password = dto.password;
    this.name = dto.name;
    this.phoneNumber = dto.phoneNumber;
    this.email = dto.email;
    this.residenceLocation = dto.residenceLocation;
  }
}
