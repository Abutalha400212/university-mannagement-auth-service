import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from './../academicDepartment/academicDepartment.interface';
import { IAcademicSemester } from './../academicSemester/academicSemester.interface';
import { Model, Types } from 'mongoose';

type IStudentBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-'
  | 'AB+'
  | 'AB-';
type IStudentGender = 'female' | 'male';

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: IStudentGender;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: IStudentBloodGroup;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
