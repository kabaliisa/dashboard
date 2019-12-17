import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navigation: any = [];
  role: any = '';
  constructor(  private auth: AuthenticationService,
    ) {
    this.navigation = [
    {
        heading: true,
        title: 'RISK'
    },
    {
      title: 'Summary',
      icon: 'fas fa-list-ul',
      url: './Summary',
    },
    {
      title: 'Transactions',
      url: './Transactions',
      icon: 'fa fa-chart-line',
      childrens: [
        {
          title: 'On Hold',
          url: '/Pendingtransactions',
          icon: 'ft-mail',
        },
        {
          title: 'Fraudulent',
          url: '/Fraudprevented',
          icon: 'ft-mail',
        },
        {
          title: 'Resolved',
          url: '/Resolvedtransactions',
          icon: 'ft-mail',
        },
        {
          title: 'Successful',
          url: '/Successfultransactions',
          icon: 'ft-mail',
        },
        {
          title: 'All Transactions',
          url: '/Alltransactions',
          icon: 'ft-mail',
        }
      ]
    },
    {
      title: 'Rules Engine',
      url: '',
      icon: 'far fa-check-square',
      childrens: [
        {
          title: 'Attributes',
          url: './Attributes',
          icon: 'fa fa-archive',
        },
        {
          title: 'Rules',
          url: './SetRules',
          icon: 'ft-mail',
        }
      ]
    },
    {
      title: 'Risk Settings',
      url: '',
      icon: 'fa fa-cog',
      translate: 'SIDENAV.MAILBOX',
      childrens: [
        {
          title: 'API',
          url: 'Settings/API',
          icon: 'fa fa-archive',
        }
      ]
    },
    {
      heading: true,
      title: 'BUREAU'
    },
    {
      title: 'Dashboard',
      url: './Bureaudashboard',
      icon: 'fa fa-tv',
    },
    {
      title: 'Fraud Search',
      url: './Fraudsearch',
      icon: 'fa fa-search',
    },
    {
      title: 'Fraud Manager',
      url: './Fraudmanager',
      icon: 'fa fa-user-tie',
    },
    {
      title: 'Bureau Settings',
      url: '',
      icon: 'fa fa-cog',
      childrens: [
        {
          title: 'Your Products',
          url: './Product',
          icon: 'fa fa-archive',
        },
        {
          title: 'API',
          url: './Bureauapi',
          icon: 'fa fa-archive',
        }
      ]
    },
    {
      heading: true,
      title: 'ACCOUNT'
    },
    {
      title: 'Profile',
      url: 'Settings/Profile',
      icon: 'ft ft-user',
    },
    {
      title: 'Users',
      url: 'Settings/Users',
      icon: 'ft ft-users',
    },
    {
      title: 'Billing',
      url: 'Settings/Billing',
      icon: 'ft ft-credit-card',
      // icon: 'fal fa-arrow-right',
    }
  ];
}



  ngOnInit() {
  }

}
