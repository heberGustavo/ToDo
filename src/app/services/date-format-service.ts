import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  format(date: Date, formatPtBr: boolean = false): string {
    if(date){
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
  
      if(formatPtBr)
        return `${dd}/${mm}/${yyyy}`;
      else
      return `${yyyy}-${mm}-${dd}`;
    }
      return date;
  }
}
