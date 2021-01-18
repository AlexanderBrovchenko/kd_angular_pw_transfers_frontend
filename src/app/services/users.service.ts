import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payee } from '../models/payee';
import { DataService } from './data.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataService: DataService,
    private http: HttpClient) {}

  findUsers():  Observable<Payee[]> {
      return this.dataService.getUserList();
  }

  sendWings(payeeid: number, amount: number): Observable<any> {
    return this.http.post(environment.apiUrl + '/protected/initializetransfer', {
      payeeid,
      amount
    }, httpOptions);
  }
}
