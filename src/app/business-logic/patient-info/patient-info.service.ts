import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientInfoDaoService } from 'src/app/dao/patient-info-dao/patient-info-dao.service';
import { Patient } from 'src/app/interfaces/patient';
import { PatientDisplay } from 'src/app/presentation/patients-list/context-model/patient-display';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoService {

  constructor(
    private patServiceDao: PatientInfoDaoService
  ) { }

  getAllPatients(): Observable<Patient[]>{
    return this.patServiceDao.getAllPatients();
  }

  async getDoctorPatientListWithDetails(docId: number): Promise<PatientDisplay[]> {
    try {
      const patList = await this.patServiceDao.getAllPatientsByDoctorId(docId).toPromise();

      if (patList) {
        const mappedPatients: PatientDisplay[] = [];

        for (const patient of patList) {
          const avatarImage = await this.getPatientAvatar(patient.imagePath).toPromise();
          const countryFlagPath = this.getCountryFlagImagePath(patient.country);

          mappedPatients.push({
            ...patient,
            avatarImage: avatarImage ? await this.blobToBase64(avatarImage) : '',
            countryFlagPath
          });
        }

        return mappedPatients;
      } else {
        console.error("Patient list is undefined.");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Error reading the Blob as base64.'));
      };
      reader.readAsDataURL(blob);
    });
  }


  getPatientInfo(patientID: number): Observable<Patient>{
    return this.patServiceDao.getPatientInfo(patientID);
  }

  getPatientAvatar(path: string): Observable<Blob>{
    return this.patServiceDao.getPatientAvatar(path);
  }

  getCountryFlagImagePath(country: string){
    return "assets/flags/" + country + ".png";
  }

  getPatientAvatarAsBase64(path: string): Observable<string> {
    return this.patServiceDao.getPatientAvatar(path).pipe(
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
