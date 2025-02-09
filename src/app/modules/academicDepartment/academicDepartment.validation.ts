import { Types } from 'mongoose';
import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    }),
  }),
});
const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z
      .string()
      .refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
