import { Injectable } from '@angular/core';
import { PetersenPaintingResource } from '../../core/api-client/petersenpainting-resources';
import { IJobsPerDayViewModel, IJobsPerMonthViewModel } from '../../core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class JobsService {
     private jobsPerMonthSubject: Subject<IJobsPerMonthViewModel> = new
         BehaviorSubject<IJobsPerMonthViewModel>(null);

     jobsPerMonth: Observable<IJobsPerMonthViewModel>;

     constructor(private resource: PetersenPaintingResource) {
         this.jobsPerMonth = this.jobsPerMonthSubject.publishReplay(0).refCount();
     }

    getJobsForMonth(searchDate: Date) {
        this.resource.post(`jobs/jobsByMonth`, '2018-03-02')
            .subscribe((d: IJobsPerMonthViewModel) => {
                this.jobsPerMonthSubject.next(d);
            });
    }
}
