import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Measurement } from 'src/app/interfaces/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementInfoDaoService {

  private baseUrl = 'http://localhost:8080/bodybrainic/measurement';
  private mAllByPatientIdUrl = '/allByPatientId';
  private mGetCsvByPathUrl = '/getCSVByPath';

  constructor(
    private http: HttpClient
  ) { }

  getAllByPatientId(patientId: number): Observable<Measurement[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('patientId', patientId);
    return this.http.
      get<Measurement[]>(this.baseUrl.concat(this.mAllByPatientIdUrl),
      {params:queryParams});
  }

  getPatientCSVByPath(csvPath: string): Observable<string>{
    let queryParams = new HttpParams();

    queryParams = queryParams.append('path', csvPath);
    return this.http.
      get(this.baseUrl.concat(this.mGetCsvByPathUrl),
      {params:queryParams, responseType: 'text'});
  }
}
