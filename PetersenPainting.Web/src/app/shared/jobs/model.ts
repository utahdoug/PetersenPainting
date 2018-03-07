import { IJobsPerMonthViewModel, IJobsPerDayViewModel, } from '../../core';

export class JobsPerDayViewModel implements IJobsPerDayViewModel {
    departmentName: string;
    departmentId: number;
    class: string;
    date: string;
    jobCount: number;

    public constructor(init?: Partial<JobsPerDayViewModel>) {
        //Object.assign(this, init);
    }
}

export class JobsPerMonthViewModel implements IJobsPerMonthViewModel {
     jobs = new Array<JobsPerDayViewModel>();

     public constructor(init?: Partial<IJobsPerMonthViewModel>) {
        //Object.assign(this, init);
    }
}
