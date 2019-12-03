import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services';

@Component({
  selector: 'app-post-record',
  templateUrl: './post-record.component.html',
  styleUrls: ['./post-record.component.css']
})
export class PostRecordComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  model;
  model2;
  transactionDate: any;
  creationDate: any;
  month: any;
  day: any;
  year: any;
  time;
  meridian = true;
  sortOrders: string[] = ['bankcard', 'mobilemoney', 'wallet'];
  units: string[] = ['UGX', 'USD'];
  selectedSortOrder = 'Payment type';
  dummyParam = '123456XYZ';
  parameter: String;
  result: any;
  transOb = {
    'transactionData': {
      'transactionId': '',
      'transactionDate': '',
      'deviceDetails': {
      'deviceId': '',
      'imei': '',
      'channelId': ''
      },
      'accountDetails': {
      'userId': '',
      'creationDate': ''
      },
      'amount': {
      'amount': 0,
      'currency': ''
      },
      'paymentMethod': {
        'name': '',
        'details': {
          'prefix': '',
          'suffix': '',
          'msisdn': '',
          'accountid': ''

        },
      },
      'productDetails': {
      'productId': '',
      'category': '',
      'name': ''
      },
      'locationDetails': {
        'address': '',
      'street': ''
      }
    },
    'comment': ''
  };
  toggleMeridian() {
    this.meridian = !this.meridian;
  }
  constructor(
    private bureauservice: BureauService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public router: Router,
    private auth: AuthenticationService,
  ) {  }

  ngOnInit() {
  }
 // tslint:disable-next-line: use-life-cycle-interface
 ngAfterContentInit() {
  this.checktokexpiry();
}
getDate(event: IMyDateModel) {
  this.transactionDate = event.singleDate.formatted;
}

getDates(event: IMyDateModel) {
  this.creationDate = event.singleDate.formatted;
  this.transOb.transactionData.accountDetails.creationDate = this.creationDate;
}

formatHour(x) {
  if ( x.toString().length === 1) {
     this.time.hour = '0' + x.toString();
  } else {
    this.time.minute = x;

  }

}

  save() {
    if ( this.time.minute.toString().length === 1) {
      this.time.minute = '0' + this.time.minute.toString();
    }
    if ( this.time.hour.toString().length === 1) {
      this.time.hour = '0' + this.time.hour.toString();
    }

    this.transOb.transactionData.accountDetails.creationDate = this.creationDate;
    this.transactionDate = this.transactionDate + ' ' + this.time.hour + ':' + this.time.minute;

    this.transOb.transactionData.transactionDate = this.transactionDate;

   if (this.transOb.transactionData.paymentMethod.name  === 'bankcard') {
    delete this.transOb.transactionData.paymentMethod.details.msisdn;
    delete this.transOb.transactionData.paymentMethod.details.accountid;
   } else if (this.transOb.transactionData.paymentMethod.name  === 'mobilemoney') {
    delete this.transOb.transactionData.paymentMethod.details['prefix'];
    delete this.transOb.transactionData.paymentMethod.details['accountid'];
    delete this.transOb.transactionData.paymentMethod.details['suffix'];
  } else if (this.transOb.transactionData.paymentMethod.name  === 'wallet') {
    delete this.transOb.transactionData.paymentMethod.details['prefix'];
    delete this.transOb.transactionData.paymentMethod.details['suffix'];
    delete this.transOb.transactionData.paymentMethod.details.msisdn;

   }
    this.bureauservice.postRecord(this.transOb)
      .subscribe(
        res => {
          this.result = res;
        },
        err => {
              this.result = {status: false, msg: 'Network Problem'};
          }, () => {
            this.result.status ? this.showsuccess() : this.ShowError() ;
        });
  }
  showsuccess(): void {
    this.toastr.success(this.result.message);
    this.router.navigate(['/Rac/Fraud-manager']);
    
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
  }


formatMinute(y){
  if ( y.toString().length === 1) {
     this.time.minute = '0' + y.toString();
  }else{
    this.time.minute = y;
  }

}
  ChangeSortOrder(e) {
    this.selectedSortOrder = e.target.value;
  }

  checktokexpiry() {
    setTimeout(() => {
      if (this.auth.checkiftokenisabouttoexpire() === 'true') {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
      };
        this.modalService.open(this.LogiModal, ngbModalOptions);
      } else {}
    }, 0);
  }

}
