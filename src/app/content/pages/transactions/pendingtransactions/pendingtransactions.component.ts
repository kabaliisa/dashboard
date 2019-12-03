import { Component, OnInit,  AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../../../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { baseurl } from '../../../../../services/config';
import { AuthenticationService } from 'src/services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { IMyDateModel, IAngularMyDpOptions } from 'angular-mydatepicker';


@Component({
  selector: 'app-pendingtransactions',
  templateUrl: './pendingtransactions.component.html',
  styleUrls: ['./pendingtransactions.component.css']
})

export class PendingtransactionsComponent implements OnInit {
  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd/mm/yyyy',
    alignSelectorRight: false,
    openSelectorTopOfInput: false,
    // other options are here...
  };
  myDateInit: Boolean = true;
  model: IMyDateModel = null;
  
  selectedcat: any = 'onhold';
  selectedsub: any = 'mlapi';
  selectedsub1: any = 'rules';
  selectedsub2: any = 'blacklist';
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  show: boolean;
  show1: boolean;
  show2: boolean;
  selected: any = '';
  data: any;
  selectedOption = false;
  transaction: '';
  comment = '';
  endDate: any;
  mydate: any;
  mydata: any;
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {paging: false};
  tabledata = [];
  ruledata = [];
  blacklistdata = [];
  // data = mydata;
  initialamt: any = 0;
  clickState: any = 0;
  result: any;
  pages = [];
  pagesblacklist = [];
  pagesrules = [];
  nextpage: any;
  algodata = [];
  previous: any;
  nextpageruledata: any;
  previousruledata: any;
  previousblacklist: any;
  nextpageblacklist: any;
  urldata: any;
  display = '';
  dawnloadurlurl = '';
  token = '';
  term;
  transactionid: '';
  // date
  bsValue = new Date();
  bsRangeValue: Date;
  maxDate = new Date();
  datePickerConfig: Partial<BsDatepickerConfig>;
  date: Date;
  closeResult: string;
  firstDate: any;
  secondDate: any;



  constructor(
    private route: Router, private modalService: NgbModal ,
    private transservice: TransactionService,
    private toastr: ToastrService,
    private auth: AuthenticationService
    ) {this.token = localStorage.getItem('_cu'); }

  ngOnInit() {
        // date values
        this.maxDate.setDate(this.maxDate.getDate() + 7);
        //  this.bsRangeValue = [this.bsValue, this.maxDate];
        // console.log(this.bsRangeValue);
         // end
        this.datePickerConfig = Object.assign({},
           {containerClass: 'theme-dark-blue',
           showWeekNumbers: false});
        this.getpendingtransactiondata(1);
        this.getBlackListedTransactions(1);
        this.getRulesListedTransactions(1);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  profile(object) {
    this.transactionid = object.transactionid;
    if (this.transactionid === '') {
      return;
    }
    // this.checktokexpiry();
    const navextras: NavigationExtras = {
      queryParams: {
        id: this.transactionid,
      }
    };
    this.transservice.setdatasession(object);
    this.route.navigate(['Rac/Transactions/PendingProfile'], navextras);
  }
// Pending Transactions
  getpendingtransactiondata(page: number) {
    this.show1 = false;
    this.showSpinner = true;
    this.pages.length = 0;
    this.tabledata.length = 0;
    // this.checktokexpiry();
    this.transservice.getpendingtransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;

          },
          (err) => {

          },
          () => {
              this.show1 = false;
              this.previous = this.result.data.prevPage;
              this.nextpage = this.result.data.nextPage;
              this.algodata = this.result.data.docs;
              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.totalPages; i++ ) {
                  if ( i > 1) {
                    // this.nextpage = i;
                  } else {
                    this.pages.push({page: i});
                  }
              }
              if (!Array.isArray(this.algodata) || !this.algodata.length || this.algodata.length === 0) {
                this.show1 = true;
              } else {
                this.show1 = false;
              }
          });
  }

  getnextransactiondata() {
      // this.checktokexpiry();
    // swaps
      this.pages = [];
      this.algodata = [];
      this.nextpage = this.nextpage;
      this.pages.push({page: this.nextpage});
      this.transservice.getpendingtransactions(this.nextpage)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
              this.previous = this.result.data.prevPage;
              this.nextpage = this.result.data.nextPage;
              this.algodata = this.result.data.docs;
    });
  }

  previousmethod() {
      // this.checktokexpiry();
      this.pages = [];
      this.tabledata = [];
      this.pages.push({page: this.previous});
      this.transservice.getpendingtransactions(this.previous)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
              this.previous = this.result.data.prevPage;
              this.nextpage = this.result.data.nextPage;
              this.tabledata = this.result.data.docs;
          });
  }

  // rules Transactions
  getRulesListedTransactions(page: number) {
    this.show2 = false;
    this.showSpinner = true;
    this.pagesrules.length = 0;
    this.ruledata = [];
    // this.checktokexpiry();
    this.transservice.getRulesListedTransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
              this.show2 = false;
              this.previousruledata = this.result.data.prevPage;
              this.nextpageruledata = this.result.data.nextPage;
              this.ruledata = this.result.data.docs;
              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.totalPages; i++ ) {
                  if ( i > 1) {
                    // this.nextpage = i;
                  } else {
                    this.pagesrules.push({page: i});
                  }
              }
              if (!Array.isArray(this.ruledata) || !this.ruledata.length) {
                this.show2 = true;
              } else {
                this.show2 = false;
              }
          });
  }

  getnexruletransactiondata() {
    // this.checktokexpiry();
  // swaps
    this.pagesrules = [];
    this.tabledata = [];
    this.nextpage = this.nextpage;
    this.pagesrules.push({page: this.nextpage});
    this.transservice.getRulesListedTransactions(this.nextpage)
    .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
            this.previousruledata = this.result.data.prevPage;
            this.nextpageruledata = this.result.data.nextPage;
            this.ruledata = this.result.data.docs;
  });
  }

  previousrulemethod() {
      // this.checktokexpiry();
      this.pagesrules = [];
      this.tabledata = [];
      this.pagesrules.push({page: this.previous});
      this.transservice.getRulesListedTransactions(this.previous)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
              this.previousruledata = this.result.data.prevPage;
              this.nextpageruledata = this.result.data.nextPage;
              this.ruledata = this.result.data;
          });
  }

  // blacklisted Transactions
  getBlackListedTransactions(page: number) {
    this.show = false;
    this.showSpinner = true;
    this.pagesblacklist.length = 0;
    this.tabledata.length = 0;
    // this.checktokexpiry();
    this.transservice.getBlackListedTransactions(page)
      .subscribe((datagot) => {
            this.result = datagot;

          },
          (err) => {
          },
          () => {
              this.show = false;
              this.previousblacklist = this.result.data.prevPage;
              this.nextpageblacklist = this.result.data.nextPage;
              this.blacklistdata = this.result.data.docs;
              setTimeout(() => {
                this.showSpinner = false;
              }, 0);
              for (let i = 1; i <= this.result.data.totalPages; i++ ) {
                  if ( i > 1) {
                    // this.nextpage = i;
                  } else {
                    this.pagesblacklist.push({page: i});
                  }
              }
              if (!Array.isArray(this.blacklistdata) || !this.blacklistdata.length) {
                this.show = true;
              } else {
                this.show = false;
              }
          });
  }

  getnextBlacklistdata() {
    // this.checktokexpiry();
  // swaps
    this.pagesblacklist = [];
    this.tabledata = [];
    this.nextpage = this.nextpage;


    this.pagesblacklist.push({page: this.nextpage});
    this.transservice.getRulesListedTransactions(this.nextpage)
    .subscribe((datagot) => {
          this.result = datagot;
        },
        (err) => {
        },
        () => {
            this.previousblacklist = this.result.data.prevPage;
            this.nextpageblacklist = this.result.data.nextPage;
            this.blacklistdata = this.result.data.docs;
  });
  }

  previousBlacklist() {
      // this.checktokexpiry();
      this.pagesblacklist = [];
      this.tabledata = [];
      this.pagesblacklist.push({page: this.previous});
      this.transservice.getRulesListedTransactions(this.previous)
      .subscribe((datagot) => {
            this.result = datagot;
          },
          (err) => {
          },
          () => {
              this.previousblacklist = this.result.data.prevPage;
              this.nextpageblacklist = this.result.data.nextPage;
              this.blacklistdata = this.result.data;
          });
  }

  openBackDropCustomClass(date) {
    this.modalService.open(date, {backdropClass: 'light-blue-backdrop'});
  }


  onDateChanged(event: IMyDateModel) {
    // this.checktokexpiry();
    // this.firstDate = new Date().toLocaleDateString();
    // this.secondDate =  new Date().toLocaleDateString();
    this.show1 = false;
    this.showSpinner = true;
    this.selectedcat = 'onhold';
    this.selectedsub = 'mlapi';
    this.data = event.dateRange.formatted;
    this.mydate = this.data.split(' - ');
    this.tabledata = [];
    if (this.mydate.length  < 2) {
      this.firstDate = new Date().toLocaleDateString();
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() + 3);
      this.secondDate = this.endDate.toLocaleDateString();
    } else if (Array.isArray(this.mydate) || this.mydate.length) {
      this.firstDate = this.mydate[0];
      this.secondDate = this.mydate[1];
    }
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
        this.result.status ? this.successfulAlgo() : this.ShowError() ;
        this.modalService.dismissAll();
      });
  }

  successfulAlgo(): void {
    // this.toastr.info(this.result.msg);
    this.algodata = this.result.data.docs;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

     if (!Array.isArray(this.algodata) || !this.algodata.length || this.algodata.length === 0) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }

  download() {
    this.transservice.downloadpending({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success2() : this.ShowError() ;
    });

  }


  success2(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);

  }

  onDateChanged2(event: IMyDateModel) {
    // this.checktokexpiry();
    // this.firstDate = new Date().toLocaleDateString();
    // this.secondDate =  new Date().toLocaleDateString();
    // this.bsRangeValue = value;
    this.selectedcat = 'onhold';
    this.selectedsub = 'rules';
    this.data = event.dateRange.formatted;
    this.mydate = this.data.split(' - ');
    this.tabledata = [];
    if (this.mydate.length  < 2) {
      this.firstDate = new Date().toLocaleDateString();
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() + 3);
      this.secondDate = this.endDate.toLocaleDateString();
    } else if (Array.isArray(this.mydate) || this.mydate.length) {
      this.firstDate = this.mydate[0];
      this.secondDate = this.mydate[1];
    }
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
        this.result.status ? this.success() : this.ShowError() ;
        this.modalService.dismissAll();
      });
  }


  success(): void {
    // this.toastr.info(this.result.msg);
    this.ruledata = this.result.data.docs;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

     if (!Array.isArray(this.ruledata) || !this.ruledata.length || this.ruledata.length === 0) {
      this.show2 = true;
    } else {
      this.show2 = false;
    }
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
        this.toastr.error(this.result.error[0].val);
      } else {
        this.toastr.error(this.result.msg);
      }
  }


  download1() {
    this.transservice.downloadpendingbyblacklist({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;
    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success1() : this.ShowError1() ;
          // this.modalService.dismissAll();
    });

  }


  success1(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
  }

  ShowError1(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
    // this.toastr.error(this.result.msg);
  }


  onDateChanged1(event: IMyDateModel) {
    // this.firstDate = new Date().toLocaleDateString();
    // this.secondDate =  new Date().toLocaleDateString();
    // this.checktokexpiry();
    this.show = false;
    this.showSpinner = true;
    this.selectedcat = 'onhold';
    this.selectedsub = 'blacklist';
    // this.bsRangeValue = value;
    this.data = event.dateRange.formatted;
    this.mydate = this.data.split(' - ');
    this.tabledata = [];
    if (this.mydate.length  < 2) {
      this.firstDate = new Date().toLocaleDateString();
      this.endDate = new Date();
      this.endDate.setDate(this.endDate.getDate() + 3);
      this.secondDate = this.endDate.toLocaleDateString();
    } else if (Array.isArray(this.mydate) || this.mydate.length) {
      this.firstDate = this.mydate[0];
      this.secondDate = this.mydate[1];
    }
    this.transservice.downexelsheet(
      {
        startdate: this.firstDate,
        enddate: this.secondDate,
        category: this.selectedcat,
        subcategory: this.selectedsub
      })
      .subscribe((resultdata) => {
        this.result = resultdata;
      }, (err) => {
            this.result = {status: false, msg: 'Network Problem'};
            this.modalService.dismissAll();
      }, () => {
        this.urldata = this.result.data;
        this.result.status ? this.success3() : this.ShowError3() ;
        this.modalService.dismissAll();
      });
  }


  success3(): void {
    this.blacklistdata = this.result.data.docs;
    setTimeout(() => {
      this.showSpinner = false;
     }, 0);

    if (!this.blacklistdata || !this.blacklistdata.length || this.blacklistdata ) {
      this.show = true;

    } else {
      this.show = false;
    }
  }

  ShowError3(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
  }

  download3() {
    this.transservice.downloadpendingbyrules({startdate: this.firstDate, enddate: this.secondDate})
    .subscribe((resultdata) => {
      this.result = resultdata;

    }, (err) => {
          this.modalService.dismissAll();
          this.result = {status: false, msg: 'Network Problem'};
    }, () => {
          this.urldata = this.result.data;
          this.result.status ? this.success4() : this.ShowError4() ;
    });

  }


  success4(): void {
    // this.toastr.info(this.result.msg);
    this.dawnloadurlurl = baseurl + 'getExcelFile?filename=' + this.urldata + '&token=' + this.token;
    window.open(this.dawnloadurlurl);
  }

  ShowError4(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
    // this.toastr.error(this.result.error[0].val);
  }

  // search filter

  save(filtered) {
    filtered.page = 1;
    Object.keys(filtered).forEach((key) => (filtered[key] == null || filtered[key] === '' && key !== 'amount'  ) && delete filtered[key]);
    this.transservice.filterTransactions(filtered)
      .subscribe(
        (data) => {
            this.result = data;
        }, (err) => {
          this.result = {status: false, msg: 'Network Error' };
        }, () => {
          this.result.status ? this.ready() : this.ShowError() ;
          this.modalService.dismissAll();
        }
      );
   }
   ready() {
    this.tabledata = [];
    this.blacklistdata = [];
    this.ruledata = [];
    this.show = false;
    this.previous = this.result.data.prevPage;
    this.nextpage = this.result.data.nextPage;
    this.tabledata = this.result.data.docs;
    this.blacklistdata = this.result.data.docs;
    this.ruledata = this.result.data.docs;


    for (let i = 1; i <= this.result.data.docs.totalPages; i++ ) {
         if ( i > 1) {
          // this.nextpage = i;
         } else {
          this.pages.push({page: i});
         }
    }

    if (this.tabledata.length === 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.toastr.info('Transactions Filtered');
   }

   onChange(e) {
    if (e.target.value === 'onhold') {
     this.selectedOption = true;
    } else {
      this.selectedOption = false;
    }
  }

  openSearch(tableSearch) {
    this.modalService.open(tableSearch, {backdropClass: 'light-blue-backdrop'});
  }

// end search filter

  approveModal(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons2(reason)}`;
    });
  }

  private getDismissReasons2(reason: any) {
    this.modalService.dismissAll();
  }


  declineModal(decline) {
    this.modalService.open(decline, {windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons1(reason)}`;
    });
  }

  private getDismissReasons1(reason: any) {
    this.modalService.dismissAll();
  }


  delineTransaction() {
    this.checktokexpiry();
    this.transservice.declinetransaction({
      transactionid: this.tabledata[0].transactiondata.transactionId,
      comment : this.comment}).subscribe((data) => {

    }, (err) => {
      this.result = {status: false, msg: 'Network Error' };

    }, () => {
      this.toastr.info('Transaction Declined');
      this.modalService.dismissAll();
    });
  }

  approveTransaction() {
    this.checktokexpiry();
    this.transservice.approvetransaction({
      transactionid: this.tabledata[0].transactiondata.transactionId,
      comment : this.comment}).subscribe((data) => {

    });
    this.toastr.success('Transaction Approved');
    this.modalService.dismissAll();
  }


  checktokexpiry() {
    setTimeout(() => {
      if (this.auth.checkiftokenisabouttoexpire() === 'true') {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false,
          // backdropClass: 'light-blue-backdrop'
        };
        this.modalService.open(this.LogiModal, ngbModalOptions);
      } else {}
    }, 0);
  }

  openDecline(updecline) {
    this.modalService.open(updecline, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    this.modalService.dismissAll();
  }

  openApprove(upapprove) {
    this.modalService.open(upapprove, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons(reason)}`;
    });
  }

  private getDismissReasons(reason: any) {
    this.modalService.dismissAll();
  }


  state() {
    if (this.clickState === 0) {
       this.algodata.sort(function(a, b) {
        const c: any = new Date(a.createdAt);
        const d: any = new Date(b.createdAt);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.algodata.sort(function(a, b) {
         const c: any = new Date(a.createdAt);
         const d: any = new Date(b.createdAt);
         return c - d;
         });
      this.clickState = 0;
    }
  }

  state1() {
    if (this.clickState === 0) {
       this.blacklistdata.sort(function(a, b) {
        const c: any = new Date(a.transactiondata.transactionDate);
        const d: any = new Date(b.transactiondata.transactionDate);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.blacklistdata.sort(function(a, b) {
         const c: any = new Date(a.transactiondata.transactionDate);
         const d: any = new Date(b.transactiondata.transactionDate);
         return c - d;
         });
      this.clickState = 0;
    }
  }

  state2() {
    if (this.clickState === 0) {
       this.blacklistdata.sort(function(a, b) {
        const c: any = new Date(a.transactiondata.transactionDate);
        const d: any = new Date(b.transactiondata.transactionDate);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.blacklistdata.sort(function(a, b) {
         const c: any = new Date(a.createdAt);
         const d: any = new Date(b.createdAt);
         return c - d;
         });
      this.clickState = 0;
    }
  }

}
