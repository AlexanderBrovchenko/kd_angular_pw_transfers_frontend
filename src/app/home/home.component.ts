import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from '../models/transfer';
import { TokenStorageService } from '../services/token-storage.service';
import { TransfersDataSource } from '../services/transfers.datasource';
import { TransfersService } from '../services/transfers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource: TransfersDataSource;
  displayedColumns= ["id", "payeeName", "operatedAt", "amount", "balance"];
  isLoggedIn: boolean;
 
  constructor(private route: ActivatedRoute,
      private router: Router,
      private transfersService: TransfersService, 
      private tokenStorageService: TokenStorageService) { 
      this.dataSource = new TransfersDataSource(this.transfersService);
      this.isLoggedIn = !!tokenStorageService.getToken();
    }

  ngOnInit(): void {
    this.pageRefresh();
  }
  
  pageRefresh(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.dataSource.loadTransfers();
   }

   onRowClicked(row: any) {
    this.router.navigate(['/transfer', 
      {payeeName: row.payeeName,
        amount: row.amount}]);
}

}
