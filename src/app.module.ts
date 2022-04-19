import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './common/tasks/tasks.module';
import { ContactRequestsModule } from './contact-requests/contact-requests.module';
import { DownloadRequestModule } from './download-requests/download-request.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      autoLoadEntities: true,
      synchronize: true
    }),

    ScheduleModule.forRoot(),

    TasksModule,

    DownloadRequestModule,
    MailModule,
    ContactRequestsModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
