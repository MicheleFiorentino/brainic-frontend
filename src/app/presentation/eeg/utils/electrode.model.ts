export class Electrode {
  name: string;
  color: string;
  isHidden: boolean;

  constructor(name: string, color: string, isHidden: boolean) {
    this.name = name;
    this.color = color;
    this.isHidden = isHidden;
  }

}
