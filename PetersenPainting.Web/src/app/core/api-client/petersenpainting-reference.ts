namespace PetersenPainting.Core.Metadata.Models {

    export interface IJobsPerDayViewModel {
        departmentName: string;
        departmentId: number;
        class: string;
        date: Date;
        jobCount: number;
    }

    export interface IJobsPerMonthViewModel {
        jobs: IJobsPerDayViewModel[];
    }
}