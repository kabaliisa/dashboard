import { SummaryService } from './../../../../services/summary.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ThemeConfig } from '../../../../app/config';
import {Router, NavigationExtras} from '@angular/router';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, TransactionService } from './../../../../services';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

declare let Chart: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

export class SummaryComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  showSpinner = false;
  show = false;
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  clickState: any = 0;
  colors: any;
  DAYS_S: any;
  public doughnutChart;
  public doughnutChart0;
  public doughnutChart1;
  public doughnutChart2;
  public doughnutChart3;
  public barChart;
  public lineChart;
  public lineChart2;
  selected: any = '';
  data = [];
  alertsdatatiles = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  alertsdatatilestotal = { onholdtoday: 0,  confirmedfraudtoday: 0,  resolvedtransactionstoday: 0, passed: 0};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  currentdates: any;
  result: any;
  FraudTiles: any;
  totaltransactiontiles = [];
  MstRtlySuspectedFraud = [];
  FdVsSusted = [];
  FdVsTotal = [];
  result11: any;
  result1: any;
  result2: any;
  result3: any;
  result4: any;
  result5: any;
  result6: any;
  result7: any;
  confirmedtoday: any = 0;
  confirmedweek: any = 0;
  confirmedmonth: any = 0;
  confirmedyear: any = 0;
  count1: any = 0;
  count2: any = 0 ;
  count3: any = 0;
  count4: any = 0;
  datatotransvsfraud = [];
  pieChart1 = [];
  pieChart2 = [];
  pieaChart3 = [];
  totaltoday: any = 0;
  totalweek: any = 0;
  totalmonth: any = 0;
  totalyear: any = 0;
  counttoday: any = 0;
  counteweek: any = 0;
  countmonth: any = 0;
  countyear: any = 0;
  dataobject: any;
  result8: any;
  result9: any;
  result10: any;
  result13: any;
  sustoday: any;
  suscount1: any;
  susweek: any;
  suscount2: any;
  susmonth: any;
  suscount3: any;
  susyear: any;
  suscount4: any;
  calicarray = [];
  suspected =  { today: 0, week: 0, month: 0, year: 0};
  lastdata = { today: 0, week: 0, month: 0, year: 0 };
  suspectedchartdata1 = [0, 0, 0, 0, 0, 0];
  confirmedchartdata2 = [0, 0, 0, 0, 0, 0];
  barChartdata = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  barChartdata2 = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  label = [];
  label2 = [];
  Months = [];
  transactionid: '';
  term;

    // date
    bsValue = new Date();
    bsRangeValue: Date;
    maxDate = new Date();
    datePickerConfig: Partial<BsDatepickerConfig>;
    date: Date;


  constructor(
    private route: Router,
    private modalService: NgbModal,
    private summeryservive: SummaryService,
    private transservice: TransactionService,
    private toast: ToastrService,
    private auth: AuthenticationService) { }

  ngOnInit() {
    // this.DAYS_S = ['00.00', '04:00', '08:00', '12:00', '04:00', '08:00', '00:00'];
    this.DAYS_S = ['00:00', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am',
    '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00', '1:00pm',
     '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],


     this.maxDate.setDate(this.maxDate.getDate() + 7);
     this.datePickerConfig = Object.assign({},
        {containerClass: 'theme-dark-blue',
        showWeekNumbers: false}
     );

     const monthNames = ['January', 'February',
     'March', 'April', 'May', 'June',
     'July', 'August', 'September',
      'October', 'November', 'December'
     ];

     const today = new Date();
     for (let i = 6; i > 0; i -= 1) {
         const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
         this.Months.push(monthNames[d.getMonth()]);
     }

    //  this.checktokexpiry();
     this.getSummarytilesdata();
     this.confirmedFraudTiles();
     this.suspiciousFraudTiles();
     this.getdatathisyear() ;
     this. MostRecentlySuspectedFraud();
     this.totalTransactionsVsFraudTransactions();
    //  this.FraudVsSuspectedFraud();
     this.OnholdbyMethod();
     this.confirmedFraudByPaymentMethod();
     this.confirmedFraudByProduct();
     this.totalTransactionTiles();
     this.confirmedFraudByTime();
     this.transactionFraudTrends();
     this.summaryFraudTrends();
     this.suspiciousFraudTrends();
     this.transactionFraudTrends();
     this.Chartmethod();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }


  getSummarytilesdata() {
      const summarydata = this.summeryservive.getSummarytilesdata().subscribe((tilesdata) => {
        this.result = tilesdata;
      },
      (error) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        // tslint:disable-next-line:max-line-length
        if (this.result.msg !== 'No Transaction registered yet') {
            if (Array.isArray(this.result.data.onholdtoday)) {
              this.alertsdatatiles.onholdtoday = this.result.data.onholdtoday[0].count;
              this.alertsdatatilestotal.onholdtoday = this.result.data.onholdtoday[0].total;
            }
            if (Array.isArray(this.result.data.confirmedfraudtoday)) {
            this.alertsdatatiles.confirmedfraudtoday = this.result.data.confirmedfraudtoday[0].count;
            this.alertsdatatilestotal.confirmedfraudtoday = this.result.data.confirmedfraudtoday[0].total;
            }
            if (Array.isArray(this.result.data.resolvedtransactionstoday)) {
              this.alertsdatatiles.resolvedtransactionstoday = this.result.data.resolvedtransactionstoday[0].count;
              this.alertsdatatilestotal.resolvedtransactionstoday = this.result.data.resolvedtransactionstoday[0].total;
            }
            if (Array.isArray(this.result.data.passed)) {
              this.alertsdatatiles.passed = this.result.data.passed[0].count;
              this.alertsdatatilestotal.passed = this.result.data.passed[0].total;
            }
          }
      });
      setTimeout(() => { summarydata.unsubscribe(); }, 10000);

  }

 getdatathisyear() {
  const annualdata = this.summeryservive.getdatathisyear().subscribe((totaltranstilesdata) => {
    this.result3 = totaltranstilesdata;
  },
  (error) => {
    this.result3 = {status: false, msg: 'Network Problem'};
  },
  () => {
    if (this.result3.msg !== 'No Transaction registered yet' && this.result3.data.length !== 0) {
        this.totalyear = this.result3.data[0].total;
        this.countyear = this.result3.data[0].count;
      }
  });
    setTimeout(() => { annualdata.unsubscribe(); }, 10000);
 }

  MostRecentlySuspectedFraud() {
    this.summeryservive.MostRecentlySuspectedFraud().subscribe((totaltranstilesdata) => {
      this.result3 = totaltranstilesdata;
    },
    (error) => {
      this.result3 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result3.msg !== 'No Transaction registered yet' && this.result3.data !== 0) {
              this.data = this.result3.data.slice(0, 9);
      }
    });
  }

  state() {
    if (this.clickState === 0) {
       this.data.sort(function(a, b) {
        const c: any = new Date(a.date);
        const d: any = new Date(b.date);
        return d - c;
        });
    this.clickState = 1;
    } else {
         this.data.sort(function(a, b) {
         const c: any = new Date(a.date);
         const d: any = new Date(b.date);
         return c - d;
         });
      this.clickState = 0;
    }
  }

//   FraudVsSuspectedFraud() {
//     this.summeryservive.totalTransactionsVsSuspiciousTransactions().subscribe((totaltranstilesdata) => {
//       this.result4 = totaltranstilesdata;
//     },
//     (error) => {
//       this.result4 = {status: false, msg: 'Network Problem'};
//     },
//     () => {
//       if (this.result4.msg !== 'No Transaction registered yet') {
//         if ( this.result4.data.totaltransactions && this.result4.data.fraudulenttransactions) {
//           const percentage1: any = ((this.result4.data.fraudulenttransactions) / (this.result4.data.totaltransactions)) * 100;
//           const percentage2: any = (100 - percentage1);
//           this.FdVsSusted[0] = Math.max(percentage1).toFixed(1) + '0';
//           this.FdVsSusted[1] = Math.max(percentage2).toFixed(1) + '0';

//         } else if (this.result4.data.totaltransactions) {
//           this.FdVsSusted[0] = Math.max(0).toFixed(1) + '0';
//           this.FdVsSusted[1] = Math.max(100).toFixed(1) + '0';

//         } else if ( this.result4.data.fraudulenttransactions) {
//           this.FdVsSusted[0] = Math.max(100).toFixed(1) + '0';
//           this.FdVsSusted[1] = Math.max(0).toFixed(1) + '0';

//         }

//         this.Chartmethod();
// }
//     });

//   }

  OnholdbyMethod() {
    this.summeryservive.onholdbyMethod().subscribe((totaltranstilesdata) => {
      this.result4 = totaltranstilesdata;
    },
    (error) => {
      this.result4 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result4.data.length !== 0 ) {
        // if ( Array.isArray(this.result4.data) || this.result4.data.length) {
        // tslint:disable-next-line: max-line-length
          const mlapi: any = ((this.result4.data[0].bymlapi) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // tslint:disable-next-line: max-line-length
          // tslint:disable-next-line: max-line-length
          const blacklist: any = ((this.result4.data[0].byblacklist) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // tslint:disable-next-line: max-line-length
          const rulesengine: any = ((this.result4.data[0].byrulesengine) / (this.result4.data[0].bymlapi + this.result4.data[0].byblacklist + this.result4.data[0].byrulesengine)) * 100;
          // const percentage2: any = (100 - percentage1);
          this.FdVsSusted[0] = Math.max(mlapi).toFixed(1) + '0';
          this.FdVsSusted[1] = Math.max(blacklist).toFixed(1) + '0';
          this.FdVsSusted[2] = Math.max(rulesengine).toFixed(1) + '0';
        // }

        this.Chartmethod();
      }
    });

  }


  totalTransactionsVsFraudTransactions() {
    this.showSpinner = true;
    this.show = false;
    this.summeryservive.totalTransactionsVsFraudTransactions().subscribe((totaltranstilesdata) => {
      this.result5 = totaltranstilesdata;
    },
    (error) => {
      this.result5 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result5.msg !== 'No Transaction registered yet') {
        if ( this.result5.data.fraudulenttransactions  && this.result5.data.fraudulenttransactions) {

          const percentage1: any = (this.result5.data.fraudulenttransactions / (this.result5.data.totaltransactions)) * 100;
          const percentage2: any = (100 - percentage1);
          this.pieChart1[0] = Math.max(percentage1).toFixed(1) + '0';
          this.pieChart1[1] = Math.max(percentage2).toFixed(1) + '0';
          setTimeout(() => {
            this.showSpinner = false;
           }, 2000);

        } else if (this.result5.data.fraudulenttransactions ) {
          this.pieChart1[0] = Math.max(100).toFixed(1) + '0';
          this.pieChart1[1] = Math.max(0).toFixed(1) + '0';
          setTimeout(() => {
            this.showSpinner = false;
           }, 2000);

        } else if (this.result5.data.totaltransactions) {
        this.pieChart1[0] = Math.max(0).toFixed(1) + '0';
        this.pieChart1[1] = Math.max(100).toFixed(1) + '0';
        setTimeout(() => {
          this.showSpinner = false;
         }, 2000);
        } else {
          this.show = true;
        }

        this.Chartmethod();

    }
    });
  }

  confirmedFraudTiles() {
    this.summeryservive.confirmedFraudTiles().subscribe((fraudtiledata) => {
      this.result1 = fraudtiledata;
    },
    (error) => {
      this.result1 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result1.msg !== 'No Transaction registered yet') {
        if ( this.result1.data.confirmedtoday.length > 0 ) {
          this.confirmedtoday = this.result1.data.confirmedtoday[0].total;
          this.count1  = this.result1.data.confirmedtoday[0].count;
        }

        if ( this.result1.data.confirmedweek.length > 0) {
          this.confirmedweek = this.result1.data.confirmedweek[0].total;
          this.count2  = this.result1.data.confirmedweek[0].count;
        }

        if ( this.result1.data.confirmedmonth.length > 0 ) {
        this.confirmedmonth = this.result1.data.confirmedmonth[0].total;
        this.count3  = this.result1.data.confirmedmonth[0].count;
        }

        if ( this.result1.data.confirmedyear.length > 0) {
          this.confirmedyear = this.result1.data.confirmedyear[0].total;
          this.count4  = this.result1.data.confirmedyear[0].count;
        }

      }



    });
  }

  suspiciousFraudTiles() {
    this.summeryservive.suspiciousFraudTiles().subscribe((sustiledata) => {
      this.result11 = sustiledata;
    },
    (error) => {
      this.result11 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result11.msg !== 'No Transaction registered yet') {
        if ( this.result11.data.today.length > 0 ) {
          this.sustoday = this.result11.data.today[0].total;
          this.suscount1  = this.result11.data.today[0].count;
        }

        if ( this.result11.data.week.length > 0) {
          this.susweek = this.result11.data.week[0].total;
          this.suscount2  = this.result11.data.week[0].count;
        }

        if ( this.result11.data.month.length > 0 ) {
        this.susmonth = this.result11.data.month[0].total;
        this.suscount3  = this.result11.data.month[0].count;
        }

        if ( this.result11.data.year.length > 0) {
          this.susyear = this.result11.data.year[0].total;
          this.suscount4  = this.result11.data.year[0].count;
        }

      }
    });
  }

  totalTransactionTiles() {
    this.summeryservive.totalTransactionTiles().subscribe((totaltranstilesdata) => {
      this.result2 = totaltranstilesdata;
    },
    (error) => {
      this.result2 = {status: false, msg: 'Network Problem'};
    },
    () => {
      if (this.result2.msg !== 'No Transaction registered yet') {
        if ( this.result2.data.transactionstoday.length > 0 ) {
         this.totaltoday = this.result2.data.transactionstoday[0].total;
         this.counttoday = this.result2.data.transactionstoday[0].count;
       }

        if ( this.result2.data.weektransactions.length > 0) {
        this.totalweek = this.result2.data.weektransactions[0].total;
        this.counteweek = this.result2.data.weektransactions[0].count;

      }

        if ( this.result2.data.monthtransactions.length > 0 ) {
         this.totalmonth = this.result2.data.monthtransactions[0].total;
         this.countmonth = this.result2.data.monthtransactions[0].count;
      }
     }
    });
  }


  confirmedFraudByPaymentMethod( ) {
    this.showSpinner = true;
    this.show = false;
     this.summeryservive.confirmedFraudByPaymentMethod().subscribe((databypayement) => {
       this.result6 = databypayement;
     }, ( ) => {

     }, () => {
      let sum = 0;
      if (this.result6.msg !== 'No Transaction registered yet') {
          if (this.result6.data.length > 1) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.result6.data.length; i++) {
              sum += this.result6.data[i].count;
            }

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.result6.data.length; i++) {
               const  percentage = (this.result6.data[i].count / sum) * 100;
               this.pieChart2.push(Math.max(percentage, 2.8).toFixed(1) + '0');
               setTimeout(() => {
                this.showSpinner = false;
               }, 2000);
               this.label2.push(this.result6.data[i]._id + ':' + ' ' + Math.max(percentage, 2.8).toFixed(1 ) + '%' );
               if (!Array.isArray(this.pieChart2) || !this.pieChart2.length) {
                this.show = true;
              } else {
                this.show = false;
              }
            }

          } else if (this.result6.data.length === 1) {
            this.pieChart2.push(100);
            this.label2.push(this.result6.data[0]._id);
            setTimeout(() => {
              this.showSpinner = false;
             }, 2000);
          } else {
            this.showSpinner = false;
            this.show = true;
          }
      } else {
        this.showSpinner = false;
        this.show = true;
      }
      this.Chartmethod();
      }
     );
  }

  confirmedFraudByProduct() {
    this.summeryservive.confirmedFraudByProduct().subscribe((productdata) => {
      this.result7 = productdata;
      this.showSpinner = true;
       }, (error) => {},
// tslint:disable-next-line: no-unused-expression
    () => {
      let sum = 0;

      if (this.result7.msg !== 'No Transaction registered yet') {
        if (this.result7.data.length > 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.result7.data.length; i++) {
            sum += this.result7.data[i].count;

          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.result7.data.length; i++) {
             const  percentage = (this.result7.data[i].count / sum) * 100;
             this.pieaChart3.push(Math.max(percentage, 2.8).toFixed(1) + '0');
             this.label.push(this.result7.data[i]._id + ':' + ' ' + Math.max(percentage, 2.8).toFixed(1 ) + '%' );
             setTimeout(() => {
              this.showSpinner = false;
             }, 0);
             if (!Array.isArray(this.pieaChart3) || !this.pieaChart3.length) {
              this.show = true;
            } else {
              this.show = false;
            }

          }

        } else if (this.result7.data.length ===  1) {
          this.pieaChart3.push(100);
          this.label.push(this.result7.data[0]._id);
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);
        } else {
          this.showSpinner = false;
          this.show = true;
        }
      } else {
        this.showSpinner = false;
        this.show = true;
      }
      this.Chartmethod();
    });
  }



  confirmedFraudByTime() {
    this.summeryservive.confirmedFraudByTime().subscribe((bytimedata) => {
       this.result8 = bytimedata;
    }, (error) => {
      this.result8 = {status: false, msg: 'Network Problem'};

    }, () => {
      if (this.result8.msg !== 'No Transaction registered yet') {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.result8.fraudbytime.length;  i++) {
        this.barChartdata[this.result8.fraudbytime[i]._id] = this.result8.fraudbytime[i].count;
      }
      for ( let i = 0; i < this.result8.suspectedbytime.length;  i++) {
        this.barChartdata2[this.result8.suspectedbytime[i]._id] = this.result8.suspectedbytime[i].count;
      }
      this.Chartmethod();
    }
  });

  }


  transactionFraudTrends() {
    this.summeryservive.transactionFraudTrends().subscribe((trendsdata1) => {
      this.result9 = trendsdata1;
    }, (error) => {
      this.result9 = {status: false, msg: 'Network Problem'};

    }, () => {
      if (this.result9.msg !== 'No Transaction registered yet') {
        if (Array.isArray(this.result9.data)) {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.result9.fraudtrends.length; i++) {
                this.confirmedchartdata2[this.result9.fraudtrends[i]._id - 1] = this.result9.fraudtrends[i].percntageconfirmed;
              }
        }
           if ( this.result9.suspectedfraud.length > 0) {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.result9.suspectedfraud.length; i++) {
                // tslint:disable-next-line: max-line-length
                this.suspectedchartdata1[this.result9.suspectedfraud[i]._id - 1] = this.result9.suspectedfraud[i].percentagesuspected;
              }
            }
        this.Chartmethod();
      } else {
        this.result9 = [];
      }
  });
  }

  summaryFraudTrends() {
    this.summeryservive.summaryFraudTrends()
      .subscribe(
      res => this.result10 = res,
      error => {

      }, () => {
      if (this.result10.msg !== 'No Transaction registered yet') {
        if (this.result10.data.today.length > 0 && this.result10.data.today[0].totaltransactions !== 0 ) {
              this.suspected.today = ((this.result10.data.today[0].confirmed / this.result10.data.today[0].totaltransactions) * 100);
              // this.lastdata.today = this.result10.data.today[0].percntageconfirmed;
            }
        if (this.result10.data.week.length > 0 && this.result10.data.week[0].totaltransactions !== 0 ) {
              this.suspected.week = ((this.result10.data.week[0].confirmed / this.result10.data.week[0].totaltransactions) * 100);
              // this.lastdata.week = this.result10.data.week[0].percntageconfirmed;
            }
        if (this.result10.data.month.length > 0 && this.result10.data.month[0].totaltransactions !== 0 ) {
              this.suspected.month = ((this.result10.data.month[0].confirmed / this.result10.data.month[0].totaltransactions) * 100);
              // this.lastdata.month = this.result10.data.month[0].percntageconfirmed;
            }
        if (this.result10.data.year.length > 0 && this.result10.data.year[0].totaltransactions !== 0 ) {
              this.suspected.year = ((this.result10.data.year[0].confirmed / this.result10.data.year[0].totaltransactions) * 100 );
              // this.lastdata.year = this.result10.data.year[0].percntageconfirmed;
            }
        }
    });
  }

  suspiciousFraudTrends() {
    this.summeryservive.suspiciousFraudTrends().subscribe((trendsdata2) => {
      this.result13 = trendsdata2;
    }, (error) => {

    }, () => {
      if (this.result13.msg !== 'No Transaction registered yet') {
        if (this.result13.data.today.length > 0 && this.result13.data.today[0].totaltransactions !== 0 ) {
              this.lastdata.today = ((this.result13.data.today[0].suspicious / this.result13.data.today[0].totaltransactions) * 100);
              // this.lastdata.today = this.result10.data.today[0].percntageconfirmed;
            }
        if (this.result13.data.week.length > 0  && this.result13.data.week[0].totaltransactions !== 0 ) {
              this.lastdata.week = ((this.result13.data.week[0].suspicious / this.result13.data.week[0].totaltransactions) * 100);
              // this.lastdata.week = this.result10.data.week[0].percntageconfirmed;
            }
        if (this.result13.data.month.length > 0  && this.result13.data.month[0].totaltransactions !== 0 ) {
              this.lastdata.month = ((this.result13.data.month[0].suspicious / this.result13.data.month[0].totaltransactions) * 100);
              // this.lastdata.month = this.result10.data.month[0].percntageconfirmed;
            }
        if (this.result13.data.year.length > 0  && this.result13.data.year[0].totaltransactions !== 0 ) {
              this.lastdata.year = ((this.result13.data.year[0].suspicious / this.result13.data.year[0].totaltransactions) * 100 );
              // this.lastdata.year = this.result10.data.year[0].percntageconfirmed;
            }

        }
    });
  }


  pendingTransactions() {
    this.route.navigate(['./Rac/Transactions/Pendingtransactions']);
  }

  confirmedFraud() {
    this.route.navigate(['./Rac/Transactions/Fraudprevented']);
  }

  resolvedTransactions() {
    this.route.navigate(['./Rac/Transactions/Resolvedtransactions']);
  }


  successfulTransactions() {
    this.route.navigate(['./Rac/Transactions/Successfultransactions']);
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  choosedDate(event: any) {
    const element = document.getElementById('effect');
    element.className += 'animated shake';
    this.selected = event;
    this.modalService.dismissAll();
  }

  Chartmethod() {
    const colors = ThemeConfig.colors;
    const color = Chart.helpers.color;
    this.doughnutChart0 = {
      type: 'doughnut',
      // tslint:disable-next-line: max-line-length
      labels: ['Algorithm' + ':' + ' ' + `${this.FdVsSusted[0]}` + '%', 'Blacklist'+ ':' + ' ' + `${this.FdVsSusted[1]}` + '%', 'Rules engine' + ':' + ' ' + `${this.FdVsSusted[2]}` + '%',],
      colors: [{ backgroundColor: [colors.primary, colors.purple, colors.success] }],
      legend: true,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'right'
        }
    }

    };

    this.doughnutChart = {
      type: 'doughnut',
      labels: ['Fraudulent' + ':' + ' ' + `${this.pieChart1[0]}` + '%', 'Total Transactions'],
      colors: [{ backgroundColor: [colors.danger, colors.primary ] }],
      legend: true,
      options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'right'
          }
      }
    };
    this.doughnutChart1 = {
      type: 'doughnut',
      data:  this.pieaChart3,
      labels:  this.label,
      colors: [{ backgroundColor: [colors.primary, colors.success, colors.danger] }],
      legend: true,
      options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'right'
          }

      }
    };

    this.doughnutChart2 = {
      type: 'doughnut',
      data: this.pieChart2,
      labels: this.label2,
      colors: [{ backgroundColor: [colors.primary, colors.success, colors.danger] }],
      legend: true,
      options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'right'
          }

      }
    };

    this.barChart = {
      type: 'bar',
      data: [
          // tslint:disable-next-line:max-line-length
          {data:  this.barChartdata, label: 'Fraudulent transactions'},
          // {data: [28, 48, 40, 19, 86, 27, 90, 30, 70], label: 'Time'}
      ],
      // tslint:disable-next-line:max-line-length
      labels: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],
      legend: true,
      colors: [
          {backgroundColor: colors.success},
          {backgroundColor: colors.success},
      ],
      options: {
          scaleShowVerticalLines: false,
          responsive: true,
          maintainAspectRatio: false,
      },
      chartClicked(e: any): void {
      },
      chartHovered(e: any): void {
      }
    };
        /*
         * Line Chart Data
         */
    this.lineChart = {
            type: 'line',
            data: [
                {data: this.confirmedchartdata2, label: 'Fraudulent Transactions'},
                {data: this.suspectedchartdata1, label: 'On hold Transactions'},
            ],
            labels: this.Months,
            legend: true,
            colors: [
              {
                borderColor: colors.danger,
                fill: false,
                borderWidth: 4,
                pointHitRadius: 30,
                pointBackgroundColor: '#fff',
                pointBorderColor: colors.danger,
                pointHoverBorderColor: '#fff',
                pointHoverBackgroundColor: colors.danger,
                pointRadius: 5,
                // lineTension: 0.1,
                pointBorderWidth: 2,
                pointHoverRadius: 6,
              },
              {
                  borderColor: colors.primary,
                  fill: false,
                  borderWidth: 4,
                  pointHitRadius: 30,
                  pointBackgroundColor: '#fff',
                  pointBorderColor: colors.primary,
                  pointHoverBorderColor: '#fff',
                  pointHoverBackgroundColor: colors.primary,
                  pointRadius: 5,
                  // lineTension: 0.1,
                  pointBorderWidth: 2,
                  pointHoverRadius: 6,
              }
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
            },
    };

    this.lineChart2 = {
      type: 'line',
      data: [
          {data: this.barChartdata, label: 'Fraudulent'},
          {data: this.barChartdata2, label: 'Suspicious'},
      ],
      labels: this.DAYS_S,
      legend: true,
      colors: [
          {
              borderColor: colors.danger,
              fill: false,
              borderWidth: 4,
              pointHitRadius: 30,
              pointBackgroundColor: '#fff',
              pointBorderColor: colors.danger,
              pointHoverBorderColor: '#fff',
              pointHoverBackgroundColor: colors.danger,
              pointRadius: 0,
              pointBorderWidth: 2,
              pointHoverRadius: 6,
          },
          {
              borderColor: colors.primary,
              fill: false,
              borderWidth: 4,
              pointHitRadius: 30,
              pointBackgroundColor: '#fff',
              pointBorderColor: colors.primary,
              pointRadius: 0,
              pointBorderWidth: 2,
              pointHoverRadius: 6,
          },
      ],
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                  }
              }]
          },
      },
  };

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


profile(object) {
  this.transactionid = object.transactionid;
  if (this.transactionid === '') {
    return;
  }
  this.checktokexpiry();
  const navextras: NavigationExtras = {
    queryParams: {
      id: this.transactionid,
    }
  };
  this.transservice.setdatasession(object);
  this.route.navigate(['Rac/Transactions/PendingProfile'], navextras);
}


  numberWithCommas(x: any) {
    // tslint:disable-next-line: use-isnan
    if (x) {
      const newx = Number(x) === NaN ? x : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return newx;
    } else {
      const anotherx = 0;
      return anotherx;
    }
   }

}
