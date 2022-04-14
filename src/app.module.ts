import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadRequestModule } from './download-requests/download-request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite3',
      autoLoadEntities: true,
      synchronize: true
    }),
    DownloadRequestModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
