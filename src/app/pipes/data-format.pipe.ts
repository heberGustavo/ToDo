import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatService } from '../services/date-format-service';

@Pipe({
    name: 'dataFormat',
    standalone: false
})
export class DataFormatPipe implements PipeTransform {

    constructor(private dateFormatService: DateFormatService) {}

    transform(date: Date): string {
        return this.dateFormatService.format(date, true);
    }
}
