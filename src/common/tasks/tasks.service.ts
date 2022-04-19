import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { DicoogleGithubService } from './dicoogle-github.service';

@Injectable()
export class TasksService {
    constructor(private dicoogleGithubService: DicoogleGithubService) { }

    @Cron(CronExpression.EVERY_6_HOURS)
    updateDicoogleReleases() {
        this.dicoogleGithubService.retrieveDicoogleReleases();
    }

    @Timeout(5000)
    getInitialDicoogleReleases() {
        this.dicoogleGithubService.retrieveDicoogleReleases();
    }
}