enum PriorityStatus {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}
export interface SentNotification {
    id: number;
    date: Date;
    bodyMessage: string;
    priorityStatus: PriorityStatus;
}