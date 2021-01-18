import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  id: number = 0;
  balance!: any;
  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService,
              private dataService: DataService) { }
              
  ngOnInit(): void {
    this.refresh();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  refresh(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();

      this.dataService.getUserInfo().subscribe(data => {
        let jsonObj = JSON.parse(JSON.stringify(data));
        this.id = jsonObj.id;
        this.balance = jsonObj.balance / 100;
      })  
    }
  }
}
