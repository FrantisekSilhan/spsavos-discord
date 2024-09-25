import { Injectable } from '@nestjs/common';
import { STATUS_CODES } from 'http';

@Injectable()
export class AppService {
  getHello(): string {
    return STATUS_CODES.OK;
  }
}
