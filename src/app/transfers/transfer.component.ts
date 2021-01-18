import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Payee } from '../models/payee';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit {
  form: any = {
    amount: null,
    payeeName: null
  };
  isLoggedIn: boolean;
  isSucceeded: boolean = false;
  resume: string = '';
  isAmountVisible: boolean = false;
  users: Payee[] = [];
  filteredUsers: Payee[] = [];
  usersControl = new FormControl();
  balance: number;

  constructor(private usersService: UsersService, 
    private tokenStorageService: TokenStorageService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router:Router) { 
      this.isLoggedIn = !!tokenStorageService.getToken();
      this.balance = appComponent.balance;
    }

  ngOnInit(): void {
    this.pageRefresh();
    this.usersControl.valueChanges.subscribe(newValue => {
      this.filteredUsers = this.filterUsers(newValue);
    })
  }

  pageRefresh(): void {
    this.usersService.findUsers()
      .subscribe(data => {
          this.users = data;
          let activatedName = this.route.snapshot.paramMap.get("payeeName");
          if (!!activatedName)
          {
            this.usersControl.setValue(activatedName);
            this.showAmount(activatedName, 
              (<unknown>this.route.snapshot.paramMap.get("amount") as number) / 100);
          }
      });
  }

  filterUsers(search: string):Payee[] {
    return this.users.filter(value =>
      value.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
  }

  showAmount(name:string, amount: number | null = null): void {
    let payee = this.users.find(p => p.name == name);
    this.isAmountVisible = (!!payee && payee.id > 0);
    this.form.amount = amount;
   }

  wastePWs(): void {
    this.isSucceeded = false;
    let payee = this.users.find(p => p.name == this.usersControl.value);
    let payeeid = payee && payee.id ? payee.id: 0;
    if (payeeid > 0) {
      if (this.form.amount > this.balance) {
        this.form.error = "You aren't that rich, buddy!";
        return;
      }
      if (this.form.amount <= 0) {
        this.form.error = "We don't send air cans!";
        return;
      }
        this.usersService.sendWings(payeeid, this.form.amount * 100)
        .subscribe(
          () => {this.resume = 'transfer saved successfully';
              this.appComponent.refresh();
              this.form.error = "";
              this.isSucceeded = true},
          console.error
      );
    }
  }

  closeBox(): void {
    this.router.navigate(['/empty']);
  }
}
