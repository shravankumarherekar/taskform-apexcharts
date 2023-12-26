import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../../task.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  tasks: Task[] = [];
  chartOptions: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.setupChart();
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  private setupChart(): void {
    // Implementing chart logic using ApexCharts
    this.chartOptions = {
      series: [
        {
          name: 'Due Tasks',
          data: this.calculateDueTasks(),
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'Due in 1 Day',
          'Due in 2 Days',
          'Due in 3 Days',
          'Due in 4 Days',
          'Due in 5 Days',
          'Due in 6 Days',
          'Due in 7 Days',
        ],
      },
    };
  }

  private calculateDueTasks(): number[] {
    // Implementing  logic to calculate due tasks for each category
    const dueTasksByDay: number[] = [
      /* Implementing  calculation logic here */
    ];
    return dueTasksByDay;
  }
}
