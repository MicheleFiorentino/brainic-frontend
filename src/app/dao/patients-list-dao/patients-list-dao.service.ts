import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsListDaoService {

  constructor(
    private http: HttpClient
  ) { }

  private patientSseUrl = 'http://localhost:8080/bodybrainic/patient/sse';
  private eventSource?: EventSource;

  createEventSource(): Observable<string>{
    this.eventSource = new EventSource(this.patientSseUrl);

    return new Observable(observer => {
      this.eventSource!!.onmessage = event => {
        observer.next(event.data);
      }
    });
  }

  destroyEventSource(){
    this.eventSource!!.close();
  }
}
