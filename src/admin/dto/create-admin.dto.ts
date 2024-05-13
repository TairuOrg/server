export class CreateAdminDto {
  constructor(
    public personal_id: string,
    public password: string,
    public name: string,
    public phone_number: string,
    public email: string,
    public residence_location: string
  ) {}
}