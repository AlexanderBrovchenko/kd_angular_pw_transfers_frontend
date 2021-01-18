import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  constructor(private dataService: DataService) {}

  findTransfers():  Observable<Transfer[]> {
      return this.dataService.getTransferList();
  }
}
