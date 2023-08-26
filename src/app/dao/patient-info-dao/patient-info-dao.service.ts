import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoDaoService {

  private baseUrl = 'http://localhost:8080/bodybrainic';
  private patInfoUrl = '/patient/byId';
  private patAllUrl = '/patient/all';
  private patAllByDoctorId = '/patient/allByDoctorId';
  private patAvatarUrl = '/patient/avatarByPath';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]>{
    return this.http.
      get<Patient[]>(this.baseUrl.concat(this.patAllUrl));
  }

  getAllPatientsByDoctorId(doctorId: number): Observable<Patient[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('doctorId',doctorId);
    return this.http.
      get<Patient[]>(this.baseUrl.concat(this.patAllByDoctorId),
      {params:queryParams});
  }

  getPatientInfo(patientID: number): Observable<Patient>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id',patientID);
    return this.http.
      get<Patient>(this.baseUrl.concat(this.patInfoUrl),
      {params:queryParams});
  }

  getPatientAvatar(path: string): Observable<Blob>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('path',path);
    return this.http.get(this.baseUrl.concat(this.patAvatarUrl),{
        responseType: 'blob',
        params: queryParams
      })
  }
}
