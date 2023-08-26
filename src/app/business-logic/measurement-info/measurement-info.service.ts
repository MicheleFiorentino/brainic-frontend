import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasurementInfoDaoService } from 'src/app/dao/measurement-info-dao/measurement-info-dao.service';
import { Measurement } from 'src/app/interfaces/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementInfoService {

  constructor(
    private mServiceDao: MeasurementInfoDaoService
  ) { }

  getPatientMeasurements(patientID: number): Observable<Measurement[]>{
    return this.mServiceDao.getAllByPatientId(patientID);
  }

  getPatientCSVByPath(csvPath: string): Observable<string>{
    return this.mServiceDao.getPatientCSVByPath(csvPath)
  }
}
