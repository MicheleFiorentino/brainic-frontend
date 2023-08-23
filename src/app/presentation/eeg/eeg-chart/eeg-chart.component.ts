import { Component, OnInit, ViewChild, OnChanges, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BWElectrodeArray } from '../utils/bwelectrode-array';

@Component({
  selector: 'app-eeg-chart',
  templateUrl: './eeg-chart.component.html',
  styleUrls: ['./eeg-chart.component.scss']
})
export class EegChartComponent {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  @Input() chartTitle?: string;
  @Input() chartData: number[][] = [];
  @Input() chartElectrodeArray: BWElectrodeArray = new BWElectrodeArray;

  public brainWavesChart?: Chart;

  ngOnInit(): void {

    this.renderBWChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChartData();
    }
  }

  renderBWChart(){
    const xValues = Array.from({ length: 1024 }, (_, i) => i + 1); // Generate an array of integers from 1 to 1024

    const myDatasets = [];
    for (let i = 0; i < this.chartElectrodeArray.data.length; i++) {
      const datasets = {
        label: this.chartElectrodeArray.data[i].name,
        backgroundColor: this.chartElectrodeArray.data[i].color,
        borderColor: this.chartElectrodeArray.data[i].color,
        data: this.chartData[i],
        hidden: this.chartElectrodeArray.data[i].isHidden,
        borderWidth: 0.5,
        pointRadius: 0
      };

      myDatasets.push(datasets);
    }

    this.brainWavesChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: myDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend:{
            display:false,
          },
          title: {
            display: true,
            text: this.chartTitle
          }
        },
        scales: {
          x : {
            display: false,
            title: {
              display: true,
              text: 'Time (8s)'
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Power (normalized)'
            },
            suggestedMin: 0,
            suggestedMax: 1
          }
        }
      }
    })
  }

  updateChartData(){
    if( !(this.brainWavesChart == null) ){
      for(let i=0; i< this.brainWavesChart!.data.datasets.length; i++){
        this.brainWavesChart!.data.datasets[i].data = this.chartData[i];
      }
      this.brainWavesChart?.update();
    }
  }

  @Input()
  public updateChartVisibility(bweaUpdated: BWElectrodeArray){
    if( !(this.brainWavesChart == null) ){
      for(let i=0; i< this.brainWavesChart!.data.datasets.length; i++){
        this.brainWavesChart!.data.datasets[i].hidden = bweaUpdated.data[i].isHidden
      }
      this.brainWavesChart?.update();
    }
  }

  @Input()
  public updateChartTitle(title: string) {
    if (this.brainWavesChart
      && this.brainWavesChart.options
      && this.brainWavesChart.options.plugins
      && this.brainWavesChart.options.plugins.title) {

      this.brainWavesChart.options.plugins.title.text = title;
    }
  }
}
