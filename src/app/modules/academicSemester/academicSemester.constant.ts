import { IAcademicSemesterMonth } from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitle = ['Autumn', 'Summer', 'Fall'];
export const academicSemesterCodes = ['01', '02', '03'];
export const academicSemesterSearchableFields = ['title', 'code'];
export const academicSemesterFilterableFields = ['searchTerm', 'title', 'code'];
export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
