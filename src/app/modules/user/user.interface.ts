import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export interface IUser {
  id: String;
  role: String;
  password: String;
  student: Types.ObjectId | IStudent;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
