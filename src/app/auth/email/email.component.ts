import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  token  = '';
  result: any;
  errormesg: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthenticationService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

confirmemail() {
          this.authservice.resendEmail(this.token).subscribe((regdata) => {
             this.result = regdata;
        }, (err) => {
            this.result = {status: false, msg: 'Network Issue'};
        }, () => {
          this.result.status ? this.donavigation() : this.ShowError() ;
        });
 }

donavigation(): void {
    const navextras: NavigationExtras = {
    queryParams: {
      token: this.token
    }
    };
    this.router.navigate([''], navextras);
}

ShowError(): void {
  if (this.result.msg === 'Service request failed') {
    this.toastr.error(this.result.error[0].val);
  } else {
    this.toastr.error(this.result.msg);
  }
  // this.toastr.success(this.result.msg);
}

}
