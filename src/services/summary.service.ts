import { baseurl2 } from './config';
import { baseurl } from '../services/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SummaryService {
id: any;
constructor(private http: HttpClient) { }

getSummarytilesdata() {
  return this.http.post(baseurl2 + 'getSummarytilesdata', '');
}

confirmedFraudTiles() {
  return this.http.post(baseurl2 + 'confirmedFraudTiles', '');
}

suspiciousFraudTiles() {
  return this.http.post(baseurl2 + 'suspiciousTransactionTiles', '');
}

suspiciousFraudTrends() {
  return this.http.post(baseurl2 + 'summarySuspectedFraudTrends', '');
}


totalTransactionTiles() {
  return this.http.post(baseurl2 + 'totalTransactionTiles', '');
}

MostRecentlySuspectedFraud() {
  return this.http.post(baseurl2 + 'MostRecentlySuspectedFraud', '');
}

FraudVsSuspectedFraud() {
  return this.http.post(baseurl2 + 'FraudVsSuspectedFraud', '');
}

FraudVsTotal() {
  return this.http.post(baseurl2 + 'totalTransactionsVsFraudTransactions', '');
}

totalTransactionsVsFraudTransactions() {
  return this.http.post(baseurl2 + 'totalTransactionsVsFraudTransactions', '');
}

totalTransactionsVsSuspiciousTransactions() {
  return this.http.post(baseurl2 + 'totaltransactionsVsSuspectedFraud', '');
}

onholdbyMethod() {
  return this.http.post(baseurl2 + 'onHoldByMethod', '');
}


confirmedFraudByProduct() {
  return this.http.post(baseurl2 + 'confirmedFraudByProduct', '');
}

confirmedFraudByPaymentMethod() {
  return this.http.post(baseurl2 + 'confirmedFraudByPaymentMethod', '');
}

confirmedFraudByTime() {
  return this.http.post(baseurl2 + 'confirmedFraudByTime', '');
}

transactionFraudTrends() {
  return this.http.post(baseurl2 + 'transactionFraudTrends', '');
}

summaryFraudTrends() {
  return this.http.post(baseurl2 + 'summaryFraudTrends', '');
}

getdatathisyear() {
  return this.http.post(baseurl2 + 'totaltransactionsThisYear', '');

}

}
