export interface Task {
    id: number,
    project: string;
    task: string;
    assinger: string;
    duration: number;
    isInProgress: boolean;
}
