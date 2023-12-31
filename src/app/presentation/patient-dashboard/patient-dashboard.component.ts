import { Component, ViewChild, OnInit} from '@angular/core';
import { PatientDashboardService } from 'src/app/business-logic/patient-dashboard/patient-dashboard.service';
import { BrainWaves } from '../eeg/utils/brainwaves.enum';
import { extractActiveEEGData, extractRestEEGData } from '../eeg/utils/bwchart.helper';
import { BWElectrodeArray } from '../eeg/utils/bwelectrode-array';
import { EegChartComponent } from '../eeg/eeg-chart/eeg-chart.component';
import { Electrode } from '../eeg/utils/electrode.model';
import { LocalStorageService } from 'src/app/business-logic/local-storage/local-storage.service';
import { Measurement } from 'src/app/interfaces/measurement';
import { NotificationService } from 'src/app/business-logic/notification/notification.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
  @ViewChild('bwChart', { static: true }) bwChart!: EegChartComponent;

  patientId!: number;
  measurements: Measurement[] = [];
  selectedIndex: number = 0;

  BrainWaves = BrainWaves;
  eegDataActive: number[][][] = []    //1: Bandwith, 2: electrode, 3: Hz -> value
  eegDataRest: number[][][] = []
  chartTitle: string = 'Active';
  chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  subtitleEEG = '';
  chartData: number[][] = []
  selectedView = ViewType.Active;
  selectedBwtype = BrainWaves.DELTA;
  selectedMeasurement: string = '';

  labels: string[] =  ['F3', 'FC5', 'AF3', 'F7', 'T7', 'P7', 'O1', 'O2', 'P8', 'T8', 'F8', 'AF4', 'FC6', 'F4'];
  chartDataDetails: number[][][] = Array.from({ length: 14 }, () => [[0]]);

  occipitalElectrodes: Electrode[] = [];
  parietalElectrodes: Electrode[] = [];
  temporalElectrodes: Electrode[] = [];
  frontalElectrodes: Electrode[] = [];

  constructor(
    private dbService: PatientDashboardService,
    private localStorage: LocalStorageService,
    private notification: NotificationService
  ){}

  ngOnInit(): void {
    this.createEventSource();
    this.initPatientId();
    this.getPatientMeasurements();
  }

  ngOnDestroy(){
    this.destroyEventSource();
  }

  //SUBSCRIBE FOR NOTIFICATIONS

  createEventSource(){
    this.dbService.createEventSource().subscribe(
      (e: string) => {
        //todo method to get a new measurment
        this.notification.show("got a new measurement!")
      }
    );
  }

  destroyEventSource(){
    this.dbService.destroyEventSource();
  }

  //INIT PATIENT ID

  initPatientId(){
    let patientIdData = this.localStorage.getData('patientId');
    this.patientId = typeof patientIdData === 'string' ? parseInt(patientIdData, 10) : 0;
  }

  //PATIENT MEASUREMENTS

  getPatientMeasurements(){
    this.dbService.getMeasurementsByPatientId(this.patientId)
    .subscribe(measurements => {
      this.measurements = measurements.sort((a, b) => {
        const timestampA = new Date(a.mtimestamp).getTime();
        const timestampB = new Date(b.mtimestamp).getTime();
        return timestampB - timestampA;
      }); //most recents first
      this.selectedMeasurement = measurements[0].mtimestamp;
      this.getEEGData(this.selectedIndex);
      this.initElectrodesView();
    });
  }

  //GET BRAIWAVES DATA OF PATIENT FROM CSV, INIT

  getEEGData(index: number): void{
    this.dbService.getEEGRawDataFile(this.measurements[index].csvPath)
    .subscribe(file => {
      this.eegDataActive = extractActiveEEGData(file);
      this.eegDataRest = extractRestEEGData(file);
      this.onUpdateEEG(this.selectedBwtype, this.selectedView);
    });
  }

  onMeasurementSelectionChange(): void {
    console.log(this.selectedIndex)
    this.getEEGData(this.selectedIndex); // Call the function to retrieve data
  }


  //DIVIDE ELECTRODES IN GROUPS

  initElectrodesView(){
    this.occipitalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['O1', 'O2'].includes(electrode.name));
    this.parietalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['P7', 'P8'].includes(electrode.name));
    this.temporalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['T7', 'T8'].includes(electrode.name));
    this.frontalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['FC5', 'FC6', 'F7', 'F8', 'F3', 'F4', 'AF3', 'AF4'].includes(electrode.name));
  }


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves, view: ViewType){
    this.updateEEGData(bwtype, view);
    this.updateEEGSubtitle(bwtype);
  }

  updateEEGData(bwtype: BrainWaves, view: ViewType){
    if(view == ViewType.Active){
      this.chartData = this.eegDataActive[bwtype];
    } else {
      this.chartData = this.eegDataRest[bwtype];
    }
    this.updateDataChartDetails();
    this.selectedBwtype = bwtype;
  }


  updateEEGSubtitle(bwtype: BrainWaves){
    this.subtitleEEG = BrainWaves[bwtype].concat(' waves');
  }


  // get custom chip colors for electrode chip
  getChipStyles(color: string) {
    return {
      'background-color': color,
      'color': '#ffffff' // Replace with the desired text color for custom chips
    };
  }

  // TOGGLE ELECTRODES WAVES IN CHART

  toggleElectrode(elName: string){
    this.chartElectrodeArray.toggleElectrodeVisibility(elName);
    this.bwChart.updateChartVisibility(this.chartElectrodeArray);
  }

  // TOGGLE VIEW CHAR (ACTIVE, REST)

  toggleView(){
    if(this.selectedView == ViewType.Active){
      this.selectedView = ViewType.Rest;
      this.chartTitle = 'Rest';
    } else {
      this.selectedView = ViewType.Active;
      this.chartTitle = 'Active';
    }

    this.updateEEGData(this.selectedBwtype, this.selectedView);
    this.bwChart.updateChartTitle(this.chartTitle)
  }


  updateEEGElectrodes(bwtype: BrainWaves, view: ViewType){
    if(view == ViewType.Active){
      this.chartData = this.eegDataActive[bwtype];
    } else {
      this.chartData = this.eegDataRest[bwtype];
    }
    this.selectedBwtype = bwtype;
  }


  updateEEGElectrodesSubtitle(bwtype: BrainWaves){
    this.subtitleEEG = BrainWaves[bwtype].concat(' waves');
  }

  updateDataChartDetails(){
    for(let i=0; i<this.chartData.length; i++){
      this.chartDataDetails[i] = [...this.chartData];

      //exclude "i" electrode. It should not be overriden
      for(let j=0; j<i; j++){
        this.chartDataDetails[i][j] = [0];
      }
      for(let j=i+1; j<14; j++){
        this.chartDataDetails[i][j] = [0];
      }
    }
  }

}

enum ViewType{
  Active,
  Rest
}
