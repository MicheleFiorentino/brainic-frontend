import { Injectable } from '@angular/core';
import { PatientsListDaoService } from 'src/app/dao/patients-list-dao/patients-list-dao.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsListService {

  constructor(
    private plDaoService: PatientsListDaoService
  ) { }

  createEventSource(){
    return this.plDaoService.createEventSource();
  }

  destroyEventSource(){
    this.plDaoService.destroyEventSource();
  }
}
