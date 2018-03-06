import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { JobsService } from '../jobs/jobs-service';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent implements OnInit{
    selectedTime = moment();
    timeDisplay = this.selectedTime.format('MMMM YYYY');

    constructor (
        readonly jobsService: JobsService
    ){ }

    ngOnInit(){
        this.jobsService.getJobsForMonth(new Date());
    }

    changeMonth(increment:number){
        this.selectedTime.add(increment, 'months');
        this.timeDisplay = this.selectedTime.format('MMMM YYYY');
    }
}