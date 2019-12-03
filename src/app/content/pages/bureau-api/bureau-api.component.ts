import { BureauService } from 'src/services/bureau.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService, AuthenticationService } from 'src/services';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Component({
  selector: 'app-bureau-api',
  templateUrl: './bureau-api.component.html',
  styleUrls: ['./bureau-api.component.css']
})
export class BureauApiComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  apiKey: any = 'ths24dm4556wessjasdfkask';
  apikeysdata: any;
  errormesg = '';
  result: any;
  id = '';
  clientid: any;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private bureauservice: BureauService,
    private toastr: ToastrService,
    private auth: AuthenticationService,
    ) {

    }

  ngOnInit() {
      this.getapikeys();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  toaster() {
    this.toastr.info('Copied.');
  }

  alerttoaster() {
    alert('You have successfully generated akey');
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  gettingStarted() {
    this.route.navigate(['Rac/Settings/GettingStarted']);
  }

  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toaster();
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

  generate() {
    this.id = '';
    this.bureauservice.generatenewapikey(this.id).subscribe((apidata) => {
      this.result = apidata;
    }, (err) => {
      this.modalService.dismissAll();
    }, () => {
      this.getapikeys();
      this.toastr.success('Api generated');

    });
    this.modalService.dismissAll();

  }

  getapikeys() {
    this.bureauservice.getClientAPIKeys(this.id).subscribe((apidata) => {
          this.result = apidata;
        }, (err) => {
      }, () => {
        this.result.stauts ? this.success() : this.ShowError() ;
      });
  }


  success(): void {
    this.apiKey = this.result.data[0].apikey;
    this.id = helper.decodeToken(localStorage.getItem('_cu')).id;
    this.modalService.dismissAll();
    
  }

  ShowError(): void {
    this.toastr.error(this.result.msg);
  }

  openModal(generates) {
    this.modalService.open(generates, {windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasons2(reason)}`;
    });
  }

  private getDismissReasons2(reason: any) {

    this.modalService.dismissAll();
  }

}
