import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BureauService } from 'src/services/bureau.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/services';

@Component({
  selector: 'app-record-profile',
  templateUrl: './record-profile.component.html',
  styleUrls: ['./record-profile.component.css']
})
export class RecordProfileComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;

  transactionid   = '';
  data: any;
  id: any;
  constructor(
    private bureauservice: BureauService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.transactionid = params.id;
    });
    this.getrecordProfile();
  }
   // tslint:disable-next-line: use-life-cycle-interface
 ngAfterContentInit() {
  this.checktokexpiry();
}

  getrecordProfile() {
    this.bureauservice.getTransactionProfile(this.transactionid)
      .subscribe(
        res => {
          this.data = res;
          this.data = this.data.data;
          console.log(this.data);
          this.id = this.data.transactiondata.transactionId;
        }
      );
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
