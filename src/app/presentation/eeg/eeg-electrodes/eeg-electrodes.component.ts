import { Component } from '@angular/core';

@Component({
  selector: 'app-eeg-electrodes',
  templateUrl: './eeg-electrodes.component.html',
  styleUrls: ['./eeg-electrodes.component.scss']
})
export class EegElectrodesComponent {
  labels: string[] =  ['F3', 'FC5', 'AF3', 'F7', 'T7', 'P7', 'O1', 'O2', 'P8', 'T8', 'F8', 'AF4', 'FC6', 'F4'];
}
