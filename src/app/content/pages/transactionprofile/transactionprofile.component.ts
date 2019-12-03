import { TransactionService } from './../../../../services/transaction.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../../../../services';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transactionprofile',
  templateUrl: './transactionprofile.component.html',
  styleUrls: ['./transactionprofile.component.css']
})

export class TransactionprofileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  transactionid   = '';
  data: any;
  logdata: any;
  status: boolean;
  testarrey = [];
  result2: any;
  result3: any;
  profiledata = [];
  SubscriptionId = '';
  comment: any = '';
  id: any;
  datacard = {Amount: 0, ProviderId: '', productid: '', TransactionStartTime: ''};
  closeResult: string;

  constructor(
               private route: ActivatedRoute,
               private transact: TransactionService,
               private toastr: ToastrService,
               private auth: AuthenticationService,
               private modalService: NgbModal,
               private router: Router,
               ) { }

  ngOnInit() {
        // this.checktokexpiry();
        this.route.queryParams.subscribe(params => {
          this.transactionid = params.id;
        });
        this.gettransactionprofiles();
        this.gettransactionlogs();

  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  gettransactionprofiles() {
    // this.checktokexpiry();
    this.transact.getTransactionProfile(this.transactionid).subscribe((transactdata) => {
      this.result2 = transactdata;
    }, () => {
    },
    () => {
      this.data = this.result2.data;
      this.status = this.result2.data.fraudflag;
      this.testarrey.push(this.data.transactiondata);

    });
  }

  gettransactionlogs() {
    // this.checktokexpiry();
    this.transact.getTransactionLogs(this.transactionid).subscribe((transactdata) => {
      this.result3 = transactdata;
      // console.log(this.result3);
    }, () => {
    },
    () => {
      this.logdata = this.result3.data;
      // console.log(this.logdata);
    });
  }

  reportfraud(status) {
    this.transact.reportfraudontransactiion({transactionid: this.transactionid, status: this.status, comment: this.comment})
    .subscribe((data) => {
      this.result2 = data;
    }, (err) => {
      this.result2 = {status: false, msg: 'Network Error' };

    }, () => {
      this.modalService.dismissAll();
      this.toastr.success('Status Updated');

      this.gettransactionprofiles();
      this.gettransactionlogs();
    });



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


  openBackDropCustomClass(update) {
    this.modalService.open(update, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return  `with: ${reason}`;
    // }
    this.modalService.dismissAll();
  }


  // openBackDropCustomClass(update) {
  //   this.modalService.open(update, {backdropClass: 'light-blue-backdrop'});

  // }

  openBackDropCustomClass1(warning) {
    this.modalService.open(warning, {backdropClass: 'light-blue-backdrop'});
    // this.modalService.dismissAll();
  }

  openBackDropCustomClass3(warningupdate) {
    this.modalService.open(warningupdate, {backdropClass: 'light-blue-backdrop'});
    // this.modalService.dismissAll();
  }

  openBackDropCustomClass2(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }


}
