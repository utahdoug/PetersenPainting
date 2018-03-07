import { Injectable } from '@angular/core';
import { PetersenPaintingResource } from '../../core/api-client/petersenpainting-resources';
import { IJobsPerDayViewModel, IJobsPerMonthViewModel } from '../../core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Moment } from 'moment';

@Injectable()
export class JobsService {
      private jobsPerMonthSubject: Subject<IJobsPerMonthViewModel> = new
          BehaviorSubject<IJobsPerMonthViewModel>(null);

     jobsPerMonth: Observable<IJobsPerMonthViewModel>;

     constructor(private resource: PetersenPaintingResource) {
         this.jobsPerMonth = this.jobsPerMonthSubject.publishReplay(0).refCount();
     }

    getJobsForMonth(searchDate: Moment) {
        this.resource.post(`jobs/jobsByMonth`, searchDate.format('YYYY-MM-DD'))
             .subscribe((d: IJobsPerMonthViewModel) => {

                 this.jobsPerMonthSubject.next(d);
             });
    }
}
