import { BureauApiComponent } from './content/pages/bureau-api/bureau-api.component';
import { PostRecordComponent } from './content/pages/post-record/post-record.component';
import { RecordProfileComponent } from './content/pages/record-profile/record-profile.component';
import { FraudSearchComponent } from './content/pages/fraud-search/fraud-search.component';
import { FraudManagerComponent } from './content/pages/fraud-manager/fraud-manager.component';
import { MobilemoneyComponent } from './content/pages/blacklist/mobilemoney/mobilemoney.component';
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
import { BlacklistaccountsComponent } from './content/pages/blacklist/blacklistaccounts/blacklistaccounts.component';
import { BlacklistcardsComponent } from './content/pages/blacklist/blacklistcards/blacklistcards.component';
import { LoadingComponent } from './content/loading/loading.component';
import { AuthGuard } from '../@helpers';
import { ConfirmingemailComponent } from './content/confirming/confirming.component';
import { ResolvedtransactionsComponent } from './content/pages/transactions/resolvedtransactions/resolvedtransactions.component';
import { PendingprofileComponent } from './content/pages/transactions/pendingtransactions/pendingprofile/pendingprofile.component';
// tslint:disable-next-line:max-line-length
import { FraudpreventedprofileComponent } from './content/pages/transactions/fraudprevented/fraudpreventedprofile/fraudpreventedprofile.component';
import { DevicesComponent } from './content/pages/blacklist/devices/devices.component';
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
    {path: 'home', component: HomeComponent},
    {path: '', component: LoginComponent},
    // {path: '', component: SearchProfileComponent},
    // {path: '', component: FraudSearchComponent},
    {path: 'Company', component: CompanyComponent},
    {path: 'Admin', component: AdminComponent},
    {path: 'Email', component: EmailComponent},
    {path: 'Logout', component: LoginComponent},
    {path: 'PageNotFound', component: PagenotfoundComponent},
    {path: 'ConfirmingEmail/:token/:role', component: ConfirmingemailComponent},
    {path: 'ressetPassword/:token', component: ResetPasswordComponent},
  //  {path: 'Rac', component: RacComponent, children: [
    {path: 'Rac', component: RacComponent, canActivate: [AuthGuard], children: [
      {
        path: 'Bureaudashboard',
        component: BureauDashboardComponent
      },
    {path: 'Searchprofile', component: SearchProfileComponent},

      {
        path: 'Fraudsearch',
        component: FraudSearchComponent
      },
      {
        path: 'Fraudmanager',
        component: FraudManagerComponent,
      },
      {path: 'Recordprofile', component: RecordProfileComponent},
      {path: 'Postrecord', component: PostRecordComponent},
      {path: 'Bureauapi', component: BureauApiComponent},

        {path: 'Summary', component: SummaryComponent},
        {path: 'Attributes', component: AttributesComponent},
        {path: 'SetRules', component: SetrulesComponent},
        {path: 'Blacklist', children: [
          {path: 'Accounts', component:   BlacklistaccountsComponent},
          {path: 'Cards', component: BlacklistcardsComponent},
          {path: 'Devices', component: DevicesComponent},
          {path: 'Mobilemoney', component:   MobilemoneyComponent},
        ]},
        {path: 'Rulesengine', component: RulesengineComponent,
        children: [
        ]
      },
      {path: 'Rules', component: RulesComponent},
      {path: 'EditRules', component: EditrulesComponent },
      {path: 'Transactions', children: [
        {path: 'Resolvedtransactions', component: ResolvedtransactionsComponent},
        {path: 'Alltransactions', component: AlltransactionsComponent},
        {path: 'Pendingtransactions', component: PendingtransactionsComponent},
        {path: 'Successfultransactions', component: SuccessTransactionsComponent},
        {path: 'PendingProfile', component: PendingprofileComponent},
        {path: 'Fraudprevented', component: FraudpreventedComponent},
        {path: 'FraudpreventedProfile/:id', component: FraudpreventedprofileComponent},
        {path: 'TransactionProfile', component: TransactionprofileComponent},
      ]},
      {path: 'Settings', children: [
        {path: 'API', component: ApiComponent },
        {path: 'GettingStarted', component: GettingStartedComponent},
        {path: 'Billing', component: BillingComponent},
        {path: 'BillingDetails/:id', component: BillingdetailsComponent},
        {path: 'Profile', component: ProfileComponent},
        {path: 'Users', component: UsersComponent}
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
