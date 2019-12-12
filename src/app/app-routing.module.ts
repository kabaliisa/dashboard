import { UsersModule } from './content/pages/settings/users/users.module';
import { EditrulesModule } from './content/pages/rulesengine/editrules/editrules.module';
import { FraudpreventedModule } from './content/pages/transactions/fraudprevented/fraudprevented.module';
import { SuccessTransactionsModule } from './content/pages/transactions/success-transactions/success-transactions.module';
import { PendingtransactionsModule } from './content/pages/transactions/pendingtransactions/pendingtransactions.module';
import { BureauApiComponent } from './content/pages/bureau-api/bureau-api.component';
import { PostRecordComponent } from './content/pages/post-record/post-record.component';
import { RecordProfileComponent } from './content/pages/record-profile/record-profile.component';
import { FraudSearchComponent } from './content/pages/fraud-search/fraud-search.component';
import { FraudManagerComponent } from './content/pages/fraud-manager/fraud-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {GettingStartedComponent} from '../app/content/pages/getting-started/getting-started.component';
import { RacComponent } from './content/rac/rac.component';
import { RacModule } from './content/rac/rac.module';
import { TransactionprofileComponent } from '../app/content/pages/transactionprofile/transactionprofile.component';
import { UsersComponent } from './content/pages/settings/users/users.component';
import { SummaryComponent } from './content/pages/summary/summary.component';
import { AlltransactionsComponent } from './content/pages/transactions/alltransactions/alltransactions.component';
import { PendingtransactionsComponent } from './content/pages/transactions/pendingtransactions/pendingtransactions.component';
import { ApiComponent } from './content/pages/settings/api/api.component';
import { BillingComponent } from './content/pages/settings/billing/billing.component';
import { ProfileComponent } from './content/pages/settings/profile/profile.component';
import { BillingdetailsComponent } from './content/pages/settings/billing/billingdetails/billingdetails.component';
import { HomeComponent } from './auth/home/home.component';
import { CompanyComponent } from './auth/company/company.component';
import { AdminComponent } from './auth/admin/admin.component';
import { EmailComponent } from './auth/email/email.component';
import { FraudpreventedComponent } from './content/pages/transactions/fraudprevented/fraudprevented.component';
import {SuccessTransactionsComponent} from './content/pages/transactions/success-transactions/success-transactions.component';
import { LoadingComponent } from './content/loading/loading.component';
import { AuthGuard } from '../@helpers';
import { ConfirmingemailComponent } from './content/confirming/confirming.component';
import { ResolvedtransactionsComponent } from './content/pages/transactions/resolvedtransactions/resolvedtransactions.component';
import { PendingprofileComponent } from './content/pages/transactions/pendingtransactions/pendingprofile/pendingprofile.component';
// tslint:disable-next-line:max-line-length
import { FraudpreventedprofileComponent } from './content/pages/transactions/fraudprevented/fraudpreventedprofile/fraudpreventedprofile.component';
import { RulesengineComponent } from './content/pages/rulesengine/rulesengine.component';
import { RulesComponent } from './content/pages/rulesengine/rules/rules.component';
import { SetrulesComponent } from './content/pages/rulesengine/setrules/setrules.component';
import { AttributesComponent } from './content/pages/settings/attributes/attributes.component';
import { EditrulesComponent } from './content/pages/rulesengine/editrules/editrules.component';
import { PagenotfoundComponent } from './content/pages/pagenotfound/pagenotfound.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BureauDashboardComponent } from './content/pages/bureau-dashboard/bureau-dashboard.component';
import { SearchProfileComponent } from './content/pages/search-profile/search-profile.component';



const routes: Routes = [
    {path: 'loading', component: LoadingComponent},
    {
      path: 'home',
      loadChildren: () => import('./auth/home/home.module').then(m => m.HomeModule)
    },
    {
      path: '',
      loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'Company',
      loadChildren: () => import('./auth/company/company.module').then(m => m.CompanyModule)
    },
    {
      path: 'Admin',
      loadChildren: () => import('./auth/admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'Email',
      loadChildren: () => import('./auth/email/email.module').then(m => m.EmailModule)
    },
    {
      path: 'Logout',
      loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
    },
    {path: 'ConfirmingEmail/:token/:role', component: ConfirmingemailComponent},
    {
      path: 'ressetPassword/:token',
      loadChildren: () => import('./auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
    },
    {path: 'Rac', component: RacComponent, canActivate: [AuthGuard], children: [
      {
        path: 'Bureaudashboard',
        component: BureauDashboardComponent
      },
      {
        path: 'Searchprofile',
        loadChildren: () => import('./content/pages/search-profile/search-profile.module').then(m => m.SearchProfileModule)
      },
      {
        path: 'Fraudsearch',
        loadChildren: () => import('./content/pages/fraud-search/fraud-search.module').then(m => m.FraudSearchModule)

      },
      {
        path: 'Fraudmanager',
        loadChildren: () => import('./content/pages/fraud-manager/fraud-manager.module').then(m => m.FraudManagerModule)
  
      },
      {
        path: 'Recordprofile', 
        loadChildren: () => import('./content/pages/record-profile/record-profile.module').then(m => m.RecordProfileModule)

      },
      {
        path: 'Postrecord', 
        loadChildren: () => import('./content/pages/post-record/post-record.module').then(m => m.PostRecordModule)
      },
      {
        path: 'Bureauapi',
        loadChildren: () => import('./content/pages/bureau-api/bureau-api.module').then(m => m.BureauApiModule)
      },

        {
          path: 'Summary',
          loadChildren: () => import('./content/pages/summary/summary.module').then(m => m.SummaryModule)
        },
        {
          path: 'Attributes', 
          loadChildren: () => import('./content/pages/settings/attributes/attributes.module').then(m => m.AttributesModule)
        },
        {
          path: 'SetRules',
          loadChildren: () => import('./content/pages/rulesengine/setrules/setrules.module').then(m => m.SetrulesModule)
        },
        {
          path: 'Rulesengine', 
          loadChildren: () => import('./content/pages/rulesengine/rulesengine.module').then(m => m.RulesengineModule),
      },
      {
        path: 'Rules', 
        loadChildren: () => import('./content/pages/rulesengine/rules/rules.module').then(m => m.RulesModule)
      },
      {
        path: 'EditRules', 
        loadChildren: () => import('./content/pages/rulesengine/editrules/editrules.module').then(m => m.EditrulesModule)
       },
      {path: 'Transactions', children: [
        {
          path: 'Resolvedtransactions',
          // tslint:disable-next-line: max-line-length
          loadChildren: () => import('./content/pages/transactions/resolvedtransactions/resolvedtransactions.module').then(m => m.ResolvedtransactionsModule)

        },
        {
          path: 'Alltransactions', 
          // tslint:disable-next-line: max-line-length
          loadChildren: () => import('./content/pages/transactions/alltransactions/alltransactions.module').then(m => m.AlltransactionsModule)

        },
        {
          path: 'Pendingtransactions', 
          loadChildren: () => import('./content/pages/transactions/pendingtransactions/pendingtransactions.module').then(m => m.PendingtransactionsModule)

        },
        {
          path: 'Successfultransactions',
          loadChildren: () => import('./content/pages/transactions/success-transactions/success-transactions.module').then(m => m.SuccessTransactionsModule)
        },
        {
          path: 'PendingProfile',
          loadChildren: () => import('./content/pages/transactions/pendingtransactions/pendingtransactions.module').then(m => m.PendingtransactionsModule)
        },
        {
          path: 'Fraudprevented',
          loadChildren: () => import('./content/pages/transactions/fraudprevented/fraudprevented.module').then(m => m.FraudpreventedModule)
        },
        { 
          path: 'FraudpreventedProfile/:id', 
          loadChildren: () => import('./content/pages/transactions/fraudprevented/fraudprevented.module').then(m => m.FraudpreventedModule)
        },
        {
          path: 'TransactionProfile',
          loadChildren: () => import('./content/pages/transactionprofile/transactionprofile.module').then(m => m.TransactionprofileModule)
        },
      ]},
      {path: 'Settings', children: [
        {
          path: 'API', 
          loadChildren: () => import('./content/pages/settings/api/api.module').then(m => m.ApiModule),
        },
        {path: 'GettingStarted', component: GettingStartedComponent},
        {path: 'Billing', component: BillingComponent},
        {path: 'BillingDetails/:id', component: BillingdetailsComponent},
        {
          path: 'Profile', 
          loadChildren: () => import('./content/pages/settings/profile/profile.module').then(m => m.ProfileModule),

        },
        {
          path: 'Users', 
          loadChildren: () => import('./content/pages/settings/users/users.module').then(m => m.UsersModule),
        }
      ]},
      ]},
    { path: '**', redirectTo: 'PageNotFound' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RacModule,
  ],
  declarations: [],
  exports: [],
})
export class AppRoutingModule { }
