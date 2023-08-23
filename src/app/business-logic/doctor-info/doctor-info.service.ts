import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Doctor } from 'src/app/interfaces/doctor';
import { DoctorInfoDaoService } from 'src/app/dao/doctor-info-dao/doctor-info-dao.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorInfoService {

  constructor(
    private doctorInfoDao: DoctorInfoDaoService
  ){}

  getDoctorInfo(doctorID: number): Observable<Doctor>{
    return this.doctorInfoDao.getDoctorInfo(doctorID);
  }

  getDoctorAvatarAsBase64(path: string): Observable<string> {
    return this.doctorInfoDao.getDoctorAvatar(path).pipe(
      switchMap((img: Blob) => {
        const reader = new FileReader();
        return new Observable<string>((observer) => {
          reader.onloadend = () => {
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.readAsDataURL(img);
        });
      }),
      catchError((error) => {
        console.error(error);
        return of(''); // Return an empty string as the default value
      })
    );
  }
}
