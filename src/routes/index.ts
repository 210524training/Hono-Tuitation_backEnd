import express, { Router } from 'express';
import ReimbursementRequest, { EventType, Status } from '../models/request';
import requestService from '../services/request.service';
import userService from '../services/user.service';
import userRouter from './user.router';

const baseRouter = Router();

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;

  const user = await userService.login(username, password);

  // req.session.isAuthenticated = true;

  // req.session.id = user.id;

  res.json(user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.id) {
    req.session.destroy(() => {
      console.log(`${req.session.id} logged out`);
    });
  }
  // If they aren't logged in, we don't need to do anything

  res.status(202).send();
}

baseRouter.post('/logout', logout);

baseRouter.get('/pending/:userId', async (req, res) => {
  res.json(
    await requestService.getAllPendingRequests(req.params.userId),
  );
});

baseRouter.get('/my_request/:userId', async (req, res) => {
  res.json(
    await requestService.getMyRequests(req.params.userId),
  );
});

baseRouter.get('/request', async (req, res) => {
  res.json(
    await requestService.getAll(),
  );
});

baseRouter.post('/request', async (req: express.Request<unknown, unknown, {
  beneficiaryId: string,
  supervisorId: string,
  managerId: string,
  eventName: string,
  eventType: string,
  startDate: string,
  endDate: string,
  cost: number,
  bencoApproval: string,
  managerApproval: string,
  supervisorApproval: string, id: string
  }, unknown, {}>, res) => {
  const {
    beneficiaryId, supervisorId, managerId, eventName,
    eventType, startDate, endDate, cost, supervisorApproval, managerApproval, bencoApproval, id,
  } = req.body;

  const request = await requestService.add(new ReimbursementRequest(
    beneficiaryId, supervisorId, managerId, eventName,
    eventType as EventType, startDate, endDate, cost,
      bencoApproval as Status, managerApproval as Status, supervisorApproval as Status, id,
  ));

  // req.session.isAuthenticated = true;

  // req.session.id = user.id;
  

  res.json(request);
});

baseRouter.use('/requests', userRouter);

export default baseRouter;
function uuidv4(): string {
  throw new Error('Function not implemented.');
}
