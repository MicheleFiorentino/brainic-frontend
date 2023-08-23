import { Component, ViewChild, OnInit} from '@angular/core';
import { PatientDashboardService } from 'src/app/business-logic/patient-dashboard/patient-dashboard.service';
import { BrainWaves } from '../eeg/utils/brainwaves.enum';
import { extractActiveEEGData, extractRestEEGData } from '../eeg/utils/bwchart.helper';
import { BWElectrodeArray } from '../eeg/utils/bwelectrode-array';
import { Router } from '@angular/router';
import { EegChartComponent } from '../eeg/eeg-chart/eeg-chart.component';
import { Electrode } from '../eeg/utils/electrode.model';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
  @ViewChild('bwChart', { static: true }) bwChart!: EegChartComponent;

  BrainWaves = BrainWaves;
  eegDataActive: number[][][] = []    //1: Bandwith, 2: electrode, 3: Hz -> value
  eegDataRest: number[][][] = []
  chartTitle: string = 'Active';
  chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  subtitleEEG = '';
  chartData: number[][] = []
  selectedView = ViewType.Active;
  selectedBwtype = BrainWaves.DELTA;
  selectedMeasurement: string = 'most recent';

  occipitalElectrodes: Electrode[] = [];
  parietalElectrodes: Electrode[] = [];
  temporalElectrodes: Electrode[] = [];
  frontalElectrodes: Electrode[] = [];

  constructor(
    private dbService: PatientDashboardService
  ){}


  ngOnInit(): void {
    this.getEEGData();
    this.occipitalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['O1', 'O2'].includes(electrode.name));
    this.parietalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['P7', 'P8'].includes(electrode.name));
    this.temporalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['T7', 'T8'].includes(electrode.name));
    this.frontalElectrodes = this.chartElectrodeArray.data.filter(electrode => ['FC5', 'FC6', 'F7', 'F8', 'F3', 'F4', 'AF3', 'AF4'].includes(electrode.name));
  }

  //GET BRAIWAVES DATA OF PATIENT FROM CSV, INIT

  getEEGData(): void{
    this.dbService.getEEGRawDataFile()
    .subscribe(file => {
      this.eegDataActive = extractActiveEEGData(file);
      this.eegDataRest = extractRestEEGData(file);
      this.onUpdateEEG(this.selectedBwtype, this.selectedView);
    });
  }


  // BUTTON UPDATING CHARTS

  onUpdateEEG(bwtype: BrainWaves, view: ViewType){
    this.updateEEGDataChart(bwtype, view);
    this.updateEEGSubtitle(bwtype);
  }

  updateEEGDataChart(bwtype: BrainWaves, view: ViewType){
    if(view == ViewType.Active){
      this.chartData = this.eegDataActive[bwtype];
    } else {
      this.chartData = this.eegDataRest[bwtype];
    }
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

    this.updateEEGDataChart(this.selectedBwtype, this.selectedView);
    this.bwChart.updateChartTitle(this.chartTitle)
  }

}

enum ViewType{
  Active,
  Rest
}
