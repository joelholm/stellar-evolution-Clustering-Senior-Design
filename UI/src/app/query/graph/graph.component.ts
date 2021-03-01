import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly.js';

// PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public graph;
  public graph3D;

  constructor() { }

  ngOnInit(): void {
    this.graph = {
          data: this.makeRandomData(),
          layout: {width: 640, height: 480, title: 'A 2D graph'}
    };
    this.graph3D = {
          data: this.makeRandomData3D(),
          layout: {
            autosize: true,
            height: 480,
            scene: {
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                camera: {
                    center: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    eye: {
                        x: 1.25,
                        y: 1.25,
                        z: 1.25
                    },
                    up: {
                        x: 0,
                        y: 0,
                        z: 1
                    }
                },
                xaxis: {
                    type: 'linear',
                    zeroline: false
                },
                yaxis: {
                    type: 'linear',
                    zeroline: false
                },
                zaxis: {
                    type: 'linear',
                    zeroline: false
                }
            },
            title: 'A 3D graph!',
            width: 640
          }
    };
  }

  makeRandomData(): any[] {
    //idk, somewhat cluster like data ...
    var data = [];

    var width: number = 2;
    var height: number = 3;
    var size: number = 30;

    var centers_x: number[] = [2, 3, 9];
    var centers_y: number[] = [2, 19, 7];
    var colors: string[] = ['red','blue','yellow'];
    for( let i = 0; i < 3; i++ ){
      data.push({ x: [], y: [], type: 'scatter', mode: 'markers', marker: {color: colors[i]}, name: `Cluster ${i + 1}`} );
      for( let j = 0; j < size; j++ ){
        data[i].x.push(
          centers_x[i] + ((this.randn_bm() - 0.5) * width)
        );
        data[i].y.push(
          centers_y[i] + ((this.randn_bm() - 0.5) * height)
        );
      }
    }

    return data;
  }

  makeRandomData3D(): any[] {
    //idk, somewhat cluster like data ...
    var data = [];

    var width: number = 2;
    var height: number = 3;
    var depth: number = 2;
    var size: number = 30;

    var centers_x: number[] = [2, 3, 9];
    var centers_y: number[] = [2, 19, 7];
    var centers_z: number[] = [-2, 5, 1];
    var colors: string[] = ['red','blue','yellow'];
    for( let i = 0; i < 3; i ++ ){
      data.push(
        { x: [], y: [], z: [], type: 'scatter3d', mode: 'markers', marker: {color: colors[i], size: 2}, name: `Cluster ${i + 1}`}
      );
      for( let j = 0; j < size; j++ ){
        var rand_x = centers_x[i] + (this.randn_bm() - 0.5) * width;
        var rand_y = centers_y[i] + (this.randn_bm() - 0.5) * height;
        var rand_z = centers_z[i] + (this.randn_bm() - 0.5) * depth;

        data[i].x.push(rand_x);
        data[i].y.push(rand_y);
        data[i].z.push(rand_z);
      }
    }
    console.log(data);

    return data;
  }

  // Standard Normal variate using Box-Muller transform.
  // https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
  randn_bm(): number {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }

}