import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('status')
  status(): { status: string } {
    return { status: 'auth module active' };
  }
}
