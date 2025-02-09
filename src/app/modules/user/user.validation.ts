import { z } from 'zod';
import { StudentBloodGroup, StudentGender } from '../student/student.constant';
import { Types } from 'mongoose';

const createStudentZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: 'Role is required',
      })
      .optional(),
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'FirstName is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last Name is Required',
        }),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of Birth is required',
        })
        .optional(),
      gender: z.enum([...(StudentGender as [string, ...string[]])], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...(StudentBloodGroup as [string, ...string[]])], {
          required_error: 'Blood Group is required',
        })
        .optional(),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      academicFaculty: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      }),
      academicDepartment: z
        .string()
        .refine(val => Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      academicSemester: z.string().refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation No is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Moher Occupation No is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is required',
        }),
        occupation: z.string({
          required_error: 'Occupation No is required',
        }),
        contactNo: z.string({
          required_error: 'Contact No is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
};
