import { Injectable, Logger, PipeTransform } from '@nestjs/common';
@Injectable()
export class FreezsePipe implements PipeTransform {
  private readonly logger = new Logger(FreezsePipe.name);
  transform(value: any) {
    this.logger.debug('Freeze pipe running...........');
    Object.freeze(value);
    return value;
  }
}
