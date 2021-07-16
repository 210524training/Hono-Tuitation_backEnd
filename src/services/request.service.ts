import { currentUser } from './../../../tuition-ui/src/remote/grubdash-backend/trms.api';
import ReimbursementRequest from '../models/request';
import requestDao, { ReimbursemnetRequestDao } from '../repositories/request.repository';
import userService from './user.service';

export class RequestService {
    private dao: ReimbursemnetRequestDao;

    constructor() {
      this.dao = requestDao;
    }

    getAll(): Promise<ReimbursementRequest[]> {
      return this.dao.getAll();
    }

    getAllPendingRequests(id: string): Promise<ReimbursementRequest[]> {
      return this.dao.getAllPendingRequests(id);
    }

    getMyRequests(id: string): Promise<ReimbursementRequest[]> {
      return this.dao.getMyRequests(id);
    }


    add(request: ReimbursementRequest): Promise<boolean> {
      return this.dao.add(new ReimbursementRequest(
        request.beneficiaryId,
        request.supervisorId,
        request.managerId,
        request.eventName,
        request.eventType,
        request.startDate,
        request.endDate,
        request.cost,
        request.bencoApproval,
        request.managerApproval,
        request.supervisorApproval,
        request.id,
      ));
    }

    update(request: ReimbursementRequest): Promise<boolean> {
     return this.dao.update(new ReimbursementRequest(
        request.beneficiaryId,
        request.supervisorId,
        request.managerId,
        request.eventName,
        request.eventType,
        request.startDate,
        request.endDate,
        request.cost,
        request.bencoApproval,
        request.managerApproval,
        request.supervisorApproval,
      )); 
    }
}

const requestService = new RequestService();

export default requestService;
