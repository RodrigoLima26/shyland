import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  loading(message:any = 'Aguarde...') {
      return Swal.fire({title: message, didOpen: () => Swal.showLoading() });
  }

  alert(icon:string = 'success', title:string = '', message:string = '', question:boolean = false) {
      return new Promise((resolve, reject) => {
          let options:any = {
              title: title,
              icon: icon,
              html: message,
              confirmButtonText: 'Entendi',
              allowOutsideClick: false
          }

          if(question) {
              options.showCancelButton = true;
              options.confirmButtonText = 'Sim';
              options.cancelButtonText = 'Não';
              options.reverseButtons = true;
          }

          Swal.fire(options).then((data:any) => {
              if(data.isConfirmed) resolve(data);
              else
                  reject(data);
          })
      })

  }

    formatDate(date:any = null, format_from:string = 'YYYY-MM-DD', format_to:string = 'DD/MM/YYYY') {
        moment.locale('pt-br');
        date = !date ? moment().format(format_from) : date;
        return moment(date, format_from).format(format_to);
    }
}
