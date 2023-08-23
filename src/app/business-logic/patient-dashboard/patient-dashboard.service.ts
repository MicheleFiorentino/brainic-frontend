import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientDashboardService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:8080/dashboard/';
  private eegUrl = 'eeg';
  private getLocalEegUrl = 'assets/dataset_0.csv';  //TMP local file

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'text/csv',
        //'Authorization': token
      }
    )
  };


  //TODO
  //With Backend, this should do a call the get the csv file from server
  getEEGRawDataFile(){
    return this.http.get(this.getLocalEegUrl, { responseType: 'text' });
  }
}
