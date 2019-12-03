import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/services';

@Component({
  selector: 'app-fraud-search',
  templateUrl: './fraud-search.component.html',
  styleUrls: ['./fraud-search.component.css']
})
export class FraudSearchComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  sortOrders: string[] = ['card', 'mobilemoney', 'device'];
  result: any;
  redirect: Boolean = false;
  selectedSortOrder = 'Select parameters';
  searchObj = {
      parameter: '',
      prefix: '',
      suffix: '',
      msisdn: '',
      imei: '',
      deviceId: '',
      userId: ''
  };

  dummyParam = '123456XYZ';
  parameter: String;
  constructor(
    public router: Router,
    private bureauservice: BureauService,
    private toastr: ToastrService,

    private modalService: NgbModal,
    private auth: AuthenticationService,

  ) {

   }

  ngOnInit() {

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }


  ChangeSortOrder(newSortOrder: string) {
    this.selectedSortOrder = newSortOrder;
    this.searchObj.parameter = this.selectedSortOrder;
  }
  submit() {
    this.bureauservice.searchRecords(this.searchObj)
      .subscribe( res => {
        this.result = res;
      }, err => {
          this.toastr.error(err.error.message);
      }, () => {

        if (!('msg' in this.result)) {
          this.showSuccess();
        } else {
          this.showError();
        }
      });
  }


  showSuccess() {

    this.bureauservice.seteditsession(this.result);
    this.router.navigate(['/Rac/Searchprofile']);
  }
  showError() {
    this.toastr.error(this.result.msg);

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
