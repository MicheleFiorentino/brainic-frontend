import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
  ){}

  show(message: string){
    const config: MatSnackBarConfig = {
      duration: 3000, // milliseconds
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    };
    this.snackBar.open(message, 'close', config);
  }
}
