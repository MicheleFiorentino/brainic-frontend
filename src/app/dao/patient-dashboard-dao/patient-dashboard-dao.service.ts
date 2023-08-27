import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDashboardDaoService {

  constructor(
    private http: HttpClient
  ) { }

  private measurementSseUrl = 'http://localhost:8080/bodybrainic/measurement/sse';
  private eventSource?: EventSource;

  createEventSource(): Observable<string>{
    this.eventSource = new EventSource(this.measurementSseUrl);

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
