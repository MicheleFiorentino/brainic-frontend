import { Electrode } from "./electrode.model";

enum Color {
  Blue1 = '#00a1ff',
  Blue2 = '#0080cb',
  Blue3 = '#00639d',
  Blue4 = '#004873',
  Blue5 = '#1f00ff',
  Blue6 = '#1900d1',
  Blue7 = '#1400a7',
  Blue8 = '#0e0073',
  Red1 = '#ff0000',
  Red2 = '#a60000',
  Green1 = '#00c917',
  Green2 = '#009111',
  Pink1 = '#ff008a',
  Pink2 = '#a8065e'
}

export class BWElectrodeArray {
  data: Electrode[];

  constructor(){
    this.data = [
      new Electrode('F3', Color.Blue1, false),
      new Electrode('FC5', Color.Blue2, false),
      new Electrode('AF3', Color.Blue3, false),
      new Electrode('F7', Color.Blue4, false),
      new Electrode('T7', Color.Red1, false),
      new Electrode('P7', Color.Green1, false),
      new Electrode('O1', Color.Pink1, false),
      new Electrode('O2', Color.Pink2, false),
      new Electrode('P8', Color.Green2, false),
      new Electrode('T8', Color.Red2, false),
      new Electrode('F8', Color.Blue5, false),
      new Electrode('AF4', Color.Blue6, false),
      new Electrode('FC6', Color.Blue7, false),
      new Electrode('F4', Color.Blue8, false)
    ];
  }

  toggleElectrodeVisibility(name: string): boolean{
    let index = this.data?.findIndex(electrode => electrode.name === name);
    if(index < 0){
      return false;
    }
    this.data[index].isHidden = !this.data[index].isHidden;
    return true;
  }

}
