import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { JobsService } from '../jobs/jobs-service';
import { Observable } from 'rxjs/Rx';
import { JobsPerMonthViewModel } from '../jobs/model';
import { IJobsPerMonthViewModel } from '../../core';
import { Day } from './model';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    selectedDate = moment();
    timeDisplay = this.selectedDate.format('MMMM YYYY');

    jobsForMonth = new JobsPerMonthViewModel();
    schedule = new Array<Day>();

    constructor(
        readonly jobsService: JobsService
    ) {
        this.jobsService.jobsPerMonth.subscribe((d: IJobsPerMonthViewModel) => {
            if (d != null) {
                this.jobsForMonth = d;
                console.log(d);
                this.createSchedule();
            }
        });
    }

    ngOnInit() {
        this.getJobs();
    }

    changeMonth(increment: number) {
        this.selectedDate.add(increment, 'months');
        this.timeDisplay = this.selectedDate.format('MMMM YYYY');
        this.getJobs();
    }

    getJobs() {
        this.jobsService.getJobsForMonth(this.selectedDate);
    }

    createSchedule() {
        let startOfMonth = moment(this.selectedDate.startOf('month').format('YYYY-MM-DD hh:mm'));
        let endOfMonth = moment(this.selectedDate.endOf('month').format('YYYY-MM-DD hh:mm'));
        let runningDay = moment(this.selectedDate.startOf('month').format('YYYY-MM-DD hh:mm'));
        let eachDay: Day;
        this.schedule = new Array<Day>();
        
        runningDay.add(startOfMonth.weekday() * -1, 'days');

        // populate any previous month's days
        while (runningDay.isBefore(startOfMonth)) {
            eachDay = new Day();
            eachDay.isCurrentMonth = false;
            eachDay.dayNumber = runningDay.format('D');

            this.schedule[this.schedule.length] = eachDay;

            runningDay.add(1, 'days');
        }

        while (runningDay.isSameOrBefore(endOfMonth)) {
            eachDay = new Day();
            eachDay.isCurrentMonth = true;
            eachDay.dayNumber = runningDay.format('D');

            eachDay.jobs = this.jobsForMonth.jobs.filter(function (job) {
                if (new Date(job.date).getDate() == runningDay.date()) { return job; }
            });

            this.schedule[this.schedule.length] = eachDay;

            runningDay.add(1, 'days');
        }
    }
}