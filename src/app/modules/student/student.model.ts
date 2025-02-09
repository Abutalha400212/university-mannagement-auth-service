import { model, Schema } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';
import { StudentBloodGroup, StudentGender } from './student.constant';

const studentSchema = new Schema<IStudent, StudentModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: String,
      lastName: {
        type: String,
        required: true,
      },
    },
  },
  gender: {
    type: String,
    required: true,
    enum: StudentGender,
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: true, unique: true },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
    enum: StudentBloodGroup,
  },
  guardian: {
    type: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  localGuardian: {
    type: {
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
});

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
