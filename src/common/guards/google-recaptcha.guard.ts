import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class GoogleRecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body: { token } } = context.switchToHttp().getRequest();

    if (!token) {
      throw new ForbiddenException();
    }

    const recaptchaValidation$ = this.verifyRecaptcha(token);
    const recaptchaValidation = await firstValueFrom(recaptchaValidation$);

    if (!recaptchaValidation.success || recaptchaValidation.score < 0.5 || (recaptchaValidation.action !== 'contact' && recaptchaValidation.action !== 'download')) {
      throw new ForbiddenException('Recaptcha verification failed.');
    }

    return true;
  }

  verifyRecaptcha(token: string) {
    return this.httpService.post(`https://www.google.com/recaptcha/api/siteverify?secret=${this.config.get('RECAPTCHA_SECRET')}&response=${token}`).pipe(map(response => {
      return response.data
    }));
  }
}
