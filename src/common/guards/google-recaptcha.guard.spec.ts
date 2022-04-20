import { GoogleRecaptchaGuard } from '../../common/guards/google-recaptcha.guard';

describe('GoogleRecaptchaGuard', () => {
  it('should be defined', () => expect(new GoogleRecaptchaGuard(null, null)).toBeDefined());
});
