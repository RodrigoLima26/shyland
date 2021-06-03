import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, args: any = {format_from: 'YYYY-MM-DD HH:mm:ss', format_to: 'DD/MM/YYYY HH:mm'}) {
      moment.locale('pt-br');
      if(!value) return "";
      return moment(value, args.format_from).format(args.format_to);
  }

}
