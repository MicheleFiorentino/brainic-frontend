import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeasurementInfoService } from '../measurement-info/measurement-info.service';

@Injectable({
  providedIn: 'root'
})
export class PatientDashboardService {

  constructor(
    private http: HttpClient,
    private mInfoService: MeasurementInfoService
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

  getMeasurementsByPatientId(patientId: number){
    return this.mInfoService.getPatientMeasurements(patientId);
  }

  getEEGRawDataFile(csvPath: string){
    return this.mInfoService.getPatientCSVByPath(csvPath)
  }
}
