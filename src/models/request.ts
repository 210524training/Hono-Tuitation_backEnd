import { v4 as uuidv4 } from 'uuid';

export default class ReimbursementRequest {
  constructor(
    public beneficiaryId: string,
    public supervisorId: string = '',
    public managerId: string = '',
    public eventName: string,
    public eventType: EventType = 'Course',
    public startDate: string,
    public endDate: string,
    public cost: number,
    public bencoApproval: Status = 'Pending',
    public managerApproval: Status = 'Pending',
    public supervisorApproval: Status = 'Pending',
    public id: string = uuidv4(),
    public acceptedAmount: number = 0,
  ) {}
}

export type EventType = 'Course' | 'Seminar' | 'PreCertificate' | 'Certificate' | 'Training' | 'Other'
export type Status = 'Pending' | 'Approved' | 'Paid' | 'Denied'
