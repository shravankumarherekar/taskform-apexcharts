// chart.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';
import * as moment from 'moment'; // Import Moment.js

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  tasks: Task[] = [];
  chartOptions: any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      // Call a function to create chart data
      this.createChart();
    });
  }

  createChart() {
    // Extract data from tasks
    const taskNames = this.tasks.map((task) => task.name);
    const dueDates = this.tasks.map((task) =>
      moment(task.dueDate).format('YYYY-MM-DD')
    ); // Format dueDate using Moment.js

    // Create chart options
    this.chartOptions = {
      series: [
        {
          name: 'Due Dates',
          data: dueDates,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: taskNames,
      },
      yaxis: {
        title: {
          text: 'Due Dates',
        },
      },
      fill: {
        opacity: 1,
      },
    };
    // console.log(this.chartOptions.series[0].data);
  }
}
