import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent {
    selectedTime = moment();
    timeDisplay = this.selectedTime.format('MMMM YYYY');

    changeMonth(increment:number){
        this.selectedTime.add(increment, 'months');
        this.timeDisplay = this.selectedTime.format('MMMM YYYY');
    }
}