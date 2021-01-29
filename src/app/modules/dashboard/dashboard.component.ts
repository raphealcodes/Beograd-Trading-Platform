import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data;
 account_verified: boolean = true;
 name = '';
 firstPayment = true;
 admin = false;
  constructor(private dashboard: DashboardService, 
    private spinner: NgxSpinnerService,
    private auth: AuthService) { }

  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
        
      }
    );
    this.getAccount();
  }


  logout() {
    this.auth.logoutUser();
  }



   private getAccount() {
    this.dashboard.getAccount().subscribe(
      (data: any[]) => {
     this.data = data;
     if(this.data) {
    this.account_verified = data['0'].is_account_verified;
    this.name = data['0'].owner.first_name;
    this.firstPayment = data['0'].owner.is_first_payment;
    this.admin = data['0'].owner.is_admin;
     }
        }

      
 
    )
    this.spinner.hide();}

}
