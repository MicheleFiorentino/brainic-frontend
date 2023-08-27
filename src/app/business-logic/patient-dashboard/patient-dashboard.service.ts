import { Injectable } from '@angular/core';
import { MeasurementInfoService } from '../measurement-info/measurement-info.service';
import { PatientDashboardDaoService } from 'src/app/dao/patient-dashboard-dao/patient-dashboard-dao.service';

@Injectable({
  providedIn: 'root'
})
export class PatientDashboardService {

  constructor(
    private mInfoService: MeasurementInfoService,
    private dbDaoService: PatientDashboardDaoService
  ) { }

  createEventSource(){
    return this.dbDaoService.createEventSource();
  }

  destroyEventSource(){
    this.dbDaoService.destroyEventSource();
  }

  getMeasurementsByPatientId(patientId: number){
    return this.mInfoService.getPatientMeasurements(patientId);
  }

  getEEGRawDataFile(csvPath: string){
    return this.mInfoService.getPatientCSVByPath(csvPath)
  }
}
