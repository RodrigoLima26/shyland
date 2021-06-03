import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(public toastr: ToastrService) { }

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

    generatePagination(page:number, last_page:number) {
      return new Promise((resolve, reject) => {
          let flag = true;
          let seq = page;
          let sequence:any = [];

          if(page > 1 && page != last_page) {
              sequence.push(page - 1);
              sequence.push(page);
          }
          else if(page > 2 && page == last_page) {
              sequence.push(page - 2);
              sequence.push(page - 1);
              sequence.push(page);
          }
          else sequence.push(page);

          if(page != last_page) {
              while(flag) {
                  if(sequence.length < 3) {
                      if(seq > last_page) flag = false;
                      else {
                          seq++;
                          sequence.push(seq);
                      }
                  }
                  else flag = false;
              }
          }

          setTimeout(() => resolve(sequence), 500);
      })
    }

    toast(type:string = 'success', title:string = '', message:string = '') {

      if(type == 'success')
        this.toastr.success(title, message);
      else if(type == 'danger')
        this.toastr.error(title, message);
      else if(type == 'warning')
        this.toastr.warning(title, message);
    }
}
