import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import ReimbursementRequest from '../models/request';
import userDAO from './user.repository';

export class ReimbursemnetRequestDao {
  private client: DocumentClient;

  constructor() {
    this.client = dynamo;
  }

  async getAll(): Promise<ReimbursementRequest[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'TRMS',
      KeyConditionExpression: 'category = :c',
      ExpressionAttributeValues: {
        ':c': 'Request',
      },
      ProjectionExpression: 'beneficiaryId, supervisorId, managerId, eventName, eventType, startDate, endDate,cost,supervisorApproval, managerApproval, bencoApproval, id',
    };

    const data = await this.client.query(params).promise();

    return data.Items as ReimbursementRequest[];
  }

  async getAllPendingRequests(id: string): Promise<ReimbursementRequest[]> {
    const user = await userDAO.getById(id);
    let params: DocumentClient.QueryInput;
    if(user?.role === 'Benco') {
      params = {
        TableName: 'TRMS',
        FilterExpression: 'beneficiaryId <> :id',
        KeyConditionExpression: 'category = :c',
        ExpressionAttributeValues: {
          ':c': 'Request',
          ':id': id,
        },

        ProjectionExpression: 'beneficiaryId, supervisorId, managerId, eventName, eventType, startDate, endDate,cost,supervisorApproval, managerApproval, bencoApproval, id',
      };
    } else {      
      params = {
        TableName: 'TRMS',
        FilterExpression: 'supervisorId = :id OR managerId = :id',
        KeyConditionExpression: 'category = :c',
        ExpressionAttributeValues: {
          ':c': 'Request',
          ':id': id,
        },

        ProjectionExpression: 'beneficiaryId, supervisorId, managerId, eventName, eventType, startDate, endDate,cost,supervisorApproval, managerApproval, bencoApproval, id',
      };
    }

    const data = await this.client.query(params).promise();

    return data.Items as ReimbursementRequest[];
  }

  async getMyRequests(id: string): Promise<ReimbursementRequest[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'TRMS',
      FilterExpression: 'beneficiaryId = :id',
      KeyConditionExpression: 'category = :c',
      ExpressionAttributeValues: {
        ':c': 'Request',
        ':id': id,
      },

      ProjectionExpression: 'beneficiaryId, supervisorId, managerId, eventName, eventType, startDate, endDate,cost,supervisorApproval, managerApproval, bencoApproval, id',
    };

    const data = await this.client.query(params).promise();

    return data.Items as ReimbursementRequest[];
  }

  async add(request: ReimbursementRequest): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'TRMS',
      Item: {
        ...request,
        category: 'Request',
      },
    };
    try {
      await this.client.put(params).promise();
      return true;
    } catch (error) {
      console.log('Failed to add Request: ', error);
      return false;
    }
  }

  async update(request: ReimbursementRequest): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'TRMS',
      Item: {
        ...request,
        category: 'Request',
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': request.id,
      },
    };

    try {
      await this.client.put(params).promise();
      return true;
    } catch (error) {
      console.log('Failed to update Request: ', error);
      return false;
    }
  }
}

const requestDao = new ReimbursemnetRequestDao();

export default requestDao;
