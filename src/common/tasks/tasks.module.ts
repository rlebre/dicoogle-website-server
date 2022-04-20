import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DicoogleGithubService } from './dicoogle-github.service';
import { TasksService } from './tasks.service';

@Module({
    imports: [HttpModule],
    providers: [TasksService, DicoogleGithubService],
})
export class TasksModule { }