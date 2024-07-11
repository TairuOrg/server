import { DbService } from '@/db/db.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto'

@Injectable()
export class MailService {
    // This is a temporary database to store the email and code sent to the user
    // Once the server is restarted, this data will be lost
    // TODO: Implement a sqlite database to store this data since we don't want to mess with the filesystem or a database like Postgres.

    constructor(private mailerService: MailerService, private db: DbService) {}
    async generateRandomAccessCode() {
        return crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    async sendResetPasswordCode(email: string, ) {
        // generate random 6 digit code:
        const code = await this.generateRandomAccessCode();
        console.log('codigo generado', code)
        this.saveSentCode(email, code)
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Restaura tu contraseña de Tairu',
                template: './reset-password',
                context: {
                    email,
                    code: code,
                },
            })
        } catch (error) {
            throw new Error('Hubo un error interno en el envio de correos, por favor intenta de nuevo mas tarde')
        }
    }
    async saveSentCode(email: string, code: string) {
        this.db.writeToFile({email, code})
    }

    async getSentCode(email: string) {
        return this.db.getCodeByEmail(email)
    }
}
