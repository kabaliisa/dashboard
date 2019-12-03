import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthenticationService} from '../../../services';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  signupForm: FormGroup;
  result: any;
  errormesg: any;
  token = '';
  userdata: any;
  newuserdata: any;

  constructor(private fb: FormBuilder, private router: Router,
              private authservice: AuthenticationService ,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private toastr: ToastrService
) { this.route.queryParams.subscribe(params => {
      this.token = params.hashkey;
    }); }

  ngOnInit() {
    this.signupForm = this.fb.group({
              fname: ['', Validators.required],
              lname: ['', Validators.required],
              phone: ['', Validators.required],
      });
  }

  register() {

    if (this.signupForm.invalid) {
      this.errormesg = 'Please provide a valid phone number';
      return ;
    }


    this.userdata = JSON.parse(localStorage.getItem('userdata'));
    this.newuserdata = {
                         email: this.userdata.email,
                         password : this.userdata.password,
                         companyname: this.userdata.companyname,
                         noofemployees: this.userdata.noofemployees,
                         currency: this.userdata.currency,
                         firstname: this.signupForm.value.fname,
                         lastname: this.signupForm.value.lname,
                         phonenumber: this.signupForm.value.phone
                        };
    // tslint:disable-next-line:max-line-length
    this.authservice. signupClient(this.newuserdata)
    .subscribe((regdata) => {
       this.result = regdata;
  }, (err) => {
       this.result = {status: false, msg: 'Network Failure'};
  }, () => {
     this.result.status ? this.donavigation() : this.ShowError() ;
  });
}

donavigation(): void {
    this.toastr.success(this.result.msg);
    this.router.navigate(['/Email']);
    localStorage.removeItem('userdata');
}

ShowError(): void {
  if ('error' in this.result) {
    this.errormesg = this.result.error[0].val;

  } else {
    this.errormesg = this.result.msg;
  }
}

openLg(terms) {
  this.modalService.open(terms, { size: 'lg' });
}

login(): void {
  this.router.navigate(['']);
}

}
