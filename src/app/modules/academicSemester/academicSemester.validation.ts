import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...(academicSemesterTitle as [string, ...string[]])], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...(academicSemesterCodes as [string, ...string[]])], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...(academicSemesterMonths as [string, ...string[]])], {
      required_error: 'StartMonth is required',
    }),
    endMonth: z.enum([...(academicSemesterMonths as [string, ...string[]])], {
      required_error: 'EndMonthy is required',
    }),
  }),
});
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...(academicSemesterTitle as [string, ...string[]])], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...(academicSemesterCodes as [string, ...string[]])], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...(academicSemesterMonths as [string, ...string[]])], {
          required_error: 'StartMonth is required',
        })
        .optional(),
      endMonth: z
        .enum([...(academicSemesterMonths as [string, ...string[]])], {
          required_error: 'EndMonthy is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data?.body.title && data?.body?.code) ||
      (!data?.body.title && !data?.body?.code),
    { message: 'Either both title and code should be provided or neither' }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
