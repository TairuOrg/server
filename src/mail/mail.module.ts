import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DbModule } from '@/db/db.module';
let nojoda = join(__dirname, '..', '..', 'mail', 'templates');
console.log(nojoda)
@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'tairuorg@gmail.com',
          pass: 'hsav nrbo dqwx unua'
        },
        tls: {
          rejectUnauthorized: false, // This is the most common approach and is the default for many e-mail clients and servers
        },
      },
      template: {
        dir: nojoda,
        adapter: new HandlebarsAdapter(),
      }
    }),
    DbModule
  ],
  exports: [MailService],
})
export class MailModule {}
