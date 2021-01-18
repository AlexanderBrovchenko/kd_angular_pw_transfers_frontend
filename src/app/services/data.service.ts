import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer';
import { Payee } from '../models/payee';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  public getUserInfo() : Observable<any>{
    return this.httpClient.get(environment.apiUrl + '/briefinfo');
  }

  public getTransferList() : Observable<Transfer[]>{
    return this.httpClient.get<Transfer[]>(environment.apiUrl + '/protected/transferlist');
  }

  public getUserList() : Observable<Payee[]>{
    return this.httpClient.get<Payee[]>(environment.apiUrl + '/users/list');
  }
}
