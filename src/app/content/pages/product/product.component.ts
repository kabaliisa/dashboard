import { SharedDataService } from './../../../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  result: any;
  constructor(
    private productservice: SharedDataService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  add(value) {
    this.productservice.addProduct(value)
    .subscribe( res => {
      this.result = res;
    }, err => {
    }, () => {
      if (!this.result.status) {
        this.toastr.error(this.result.error[0].val);
      } else {
        this.toastr.success(this.result.msg);

      }
    });
  }

}
