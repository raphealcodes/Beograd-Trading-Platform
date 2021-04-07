import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  data: any[];
  dataSummary: any;
  account_verified: boolean = true;
  firstPayment = true;
  length: any;
  constructor(private dashboard: DashboardService
    , private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
           this.getAccountSummary();
        
      }
    );
    this.getAccount();
    this.getAccountSummary();
  }

  activate(id: any, event: any) {
    // console.log(id);
    const data: any = {
      user_status: event
    };
    this.dashboard.activateUser(id, data).subscribe(
      res => {
      //   console.log(res);
      }
    )
  }



   private getAccount() {
    this.dashboard.getUser().subscribe(
      (data: any[]) => {
     this.data = data;
     this.length = data.length;
     if(this.data) {
    // this.account_verified = data['0'].is_account_verified;
    // this.firstPayment = data['0'].owner.is_first_payment;
     }
        }

      
 
    )
    this.spinner.hide();}

    private getAccountSummary() {
      this.dashboard.getUserSummary().subscribe(
        (data: any[]) => {
       this.dataSummary = data;
       this.length = data.length;
       if(this.data) {
      // this.account_verified = data['0'].is_account_verified;
      // this.firstPayment = data['0'].owner.is_first_payment;
       }
          }
  
        
   
      )
      this.spinner.hide();}

}