import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadRequestModule } from './download-requests/download-request.module';
import { MailModule } from './mail/mail.module';
import { ContactRequestsModule } from './contact-requests/contact-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      autoLoadEntities: true,
      synchronize: true
    }),
    DownloadRequestModule,
    MailModule,
    ContactRequestsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
