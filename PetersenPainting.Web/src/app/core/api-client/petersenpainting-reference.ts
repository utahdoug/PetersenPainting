namespace PetersenPainting.Core.Metadata.Models {    
    export interface IJobsPerDayViewModel {
        departmentName: string;
        departmentId: number;
        class: string;
        date: string;
        jobCount: number;
    }

    export interface IJobsPerMonthViewModel {
        jobs: IJobsPerDayViewModel[];
    }
}