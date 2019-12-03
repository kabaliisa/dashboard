import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    // animation triggers go here
  ]
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  token: any;
  result: any;
  testForm;
  errormesg = '';
  employees = ['1-9', '10-49', '50-99', '100-249', '250-499', '500-999', '1000-4999', '5000+'];
  currencytype = ['UGX', 'USD', 'EUR', 'RWF'];
  userdata: any;
  newuserdata: any;
  constructor(
    private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authservice: AuthenticationService) { }

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
      this.token = params.hashkey;
    });
    //  this.companyForm = this.fb.group({
    //   company: ['', Validators.required],
    //   noofemployees: [this.employees[0], Validators.required]
    // });

     this.companyForm = new FormGroup({
      company: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      noofemployees: new FormControl(this.employees[0], Validators.required)
    });
  }

  register() {
    // if (this.companyForm.invalid) {
    //   return ;
    // }
    // get data from local storage
    this.userdata = JSON.parse(localStorage.getItem('userdata'));
    this.newuserdata = {
                         email: this.userdata.email,
                         password : this.userdata.password,
                         companyname: this.companyForm.value.company,
                         currency: this.companyForm.value.currency,
                         noofemployees: this.companyForm.value.noofemployees
                        };
    localStorage.setItem('userdata', JSON.stringify(this.newuserdata));
    this.donavigation();
  }

  donavigation(): void {
  this.router.navigate(['/Admin']);
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
    // this.errormesg = this.result.msg;
  }

  login(): void {
    this.router.navigate(['']);
  }
}
