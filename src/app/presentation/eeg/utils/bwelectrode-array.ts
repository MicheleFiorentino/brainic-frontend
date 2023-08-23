import { Electrode } from "./electrode.model";

enum Color {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Magenta = '#FF00FF',
  Cyan = '#00FFFF',
  Orange = '#FF8000',
  SkyBlue = '#0080FF',
  Purple = '#8000FF',
  Lime = '#80FF00',
  Pink = '#FF0080',
  Turquoise = '#00FF80',
  Indigo = '#8000FF',
  Azure = '#0080FF'
}

export class BWElectrodeArray {
  data: Electrode[];

  constructor(){
    this.data = [
      new Electrode('F3', Color.Red, false),
      new Electrode('FC5', Color.Green, false),
      new Electrode('AF3', Color.Blue, false),
      new Electrode('F7', Color.Yellow, false),
      new Electrode('T7', Color.Magenta, false),
      new Electrode('P7', Color.Cyan, false),
      new Electrode('O1', Color.Orange, false),
      new Electrode('O2', Color.SkyBlue, false),
      new Electrode('P8', Color.Purple, false),
      new Electrode('T8', Color.Lime, false),
      new Electrode('F8', Color.Pink, false),
      new Electrode('AF4', Color.Turquoise, false),
      new Electrode('FC6', Color.Indigo, false),
      new Electrode('F4', Color.Azure, false)
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
