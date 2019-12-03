import { TransactionService } from './../../../../../../services/transaction.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../../../../../services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fraudpreventedprofile',
  templateUrl: './fraudpreventedprofile.component.html',
  styleUrls: ['./fraudpreventedprofile.component.css']
})
export class FraudpreventedprofileComponent implements OnInit {
  // @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  data: any;
  transaction: '';
  result2: any;
  profiledata = [];
  transactionid: any;
  testarrey: any;

  constructor(
              private route: ActivatedRoute ,
              private transact: TransactionService,
              private auth: AuthenticationService,
              private modalService: NgbModal

              ) { }


    ngOnInit() {
      // this.checktokexpiry();
      this.route.queryParams.subscribe(params => {
        this.transactionid = params.id;
      });
      this.gettransactionprofiles();

  }

  gettransactionprofiles() {
  // this.checktokexpiry();
  this.transact.getTransactionProfile(this.transactionid).subscribe((transactdata) => {
    this.result2 = transactdata;
  }, () => {

  },
  () => {
    this.data = this.result2.data;
    this.testarrey.push(this.data.transactiondata);

  });
  }


  // checktokexpiry() {
  //   if (this.auth.checkiftokenisabouttoexpire() === 'true') {
  //         const ngbModalOptions: NgbModalOptions = {
  //           backdrop : 'static',
  //           keyboard : false
  //       };
  //         this.modalService.open(this.modalService, ngbModalOptions);

  //   } else {
  //   }
  // }

}
