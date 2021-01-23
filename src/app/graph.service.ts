import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  myChart;

  constructor() { }

  createLineGraph(dataObject) {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('myChart');
    let ctx = canvas.getContext('2d');

    this.myChart = new Chart(ctx, {

      type: 'line',
      data: dataObject,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                'millisecond': 'MMM DD',
                'second': 'MMM DD',
                'minute': 'MMM DD',
                'hour': 'MMM DD',
                'day': 'MMM DD',
                'week': 'MMM DD',
                'month': 'MMM DD',
                'quarter': 'MMM DD',
                'year': 'MMM DD',
              }
            }
          }],
        }
      }

    });

    return this.myChart;

  }

}
