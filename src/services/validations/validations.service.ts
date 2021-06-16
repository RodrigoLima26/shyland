import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  emailIsValid(email:string) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  dateIsValid(date, format_from) {
      moment.locale('pt-br');
      return moment(moment(date, format_from).format('YYYY-MM-DD'), 'YYYY-MM-DD',true).isValid();
  }
}
