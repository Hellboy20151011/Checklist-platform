import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncService {
  getStatus(): { status: string } {
    return { status: 'sync module active' };
  }
}
