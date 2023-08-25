import { Component, Input } from '@angular/core';
import { mixColors } from '../utils/mix-colors.helper';

@Component({
  selector: 'app-eeg-electrodes',
  templateUrl: './eeg-electrodes.component.html',
  styleUrls: ['./eeg-electrodes.component.scss']
})
export class EegElectrodesComponent {
  @Input() data: number[][] = []  //1-electrode, 2- values
  startColor = '#04002b';
  endColor = '#ff0000';

  labels: string[] =  ['F3', 'FC5', 'AF3', 'F7', 'T7', 'P7', 'O1', 'O2', 'P8', 'T8', 'F8', 'AF4', 'FC6', 'F4'];
  meanElectrodesValues: number[] = [];

  ngOnInit(){
    this.meanElectrodesValues = this.getMeanElectrodesValuesFromData(this.data);
  }

  ngOnChanges(){
    this.meanElectrodesValues = this.getMeanElectrodesValuesFromData(this.data);
  }

  getBackgroundColor(index: number): string {
    const gradientPercentage = this.meanElectrodesValues[index];
    const mixedColor = mixColors(this.startColor, this.endColor, gradientPercentage);
    return `${mixedColor}`;
  }

  getMeanElectrodesValuesFromData(data: number[][]){
    let means: number[] = [];

    for(let i=0; i<data.length; i++){
      let sum = 0;
      let measurmentsNumber = data[i].length;
      for(let j=0; j<measurmentsNumber; j++){
        sum += data[i][j];
      }
      means[i] = sum/measurmentsNumber;
    }

    return means;
  }

}
