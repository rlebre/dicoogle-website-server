import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DicoogleReleasesService } from '../dicoogle-releases.global';

@Injectable()
export class DicoogleGithubService {

    constructor(private httpService: HttpService) { }

    retrieveDicoogleReleases() {
        this.httpService.get('https://api.github.com/repos/bioinformatics-ua/dicoogle/releases').subscribe(response => {
            const releases = response.data.map(
                (release: any) => ({
                    id: release.id,
                    tag_name: release.tag_name,
                    published_at: release.published_at,
                    downloadLink: release.assets[0]?.browser_download_url || ''
                }))
                .filter((release) => release.downloadLink !== '')
                .sort(
                    (release1, release2) => Date.parse(release2.published_at) - Date.parse(release1.published_at)
                );

            const result = releases.reduce((obj, cur) => ({ ...obj, [cur.tag_name]: cur }), {})
            console.log('Retrieving...');
            DicoogleReleasesService.ghReleases = result;
        });
    }
}
