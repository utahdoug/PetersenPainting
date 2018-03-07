import { JobsPerDayViewModel } from '../jobs/model';

export class Day {
    dayNumber: string;
    isCurrentMonth: boolean;
    jobs: Array<JobsPerDayViewModel>;
}