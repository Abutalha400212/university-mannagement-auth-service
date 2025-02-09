import { Model } from 'mongoose';

export type IAcademicSemesterFilters = {
  searchTerm: string;
  title: string;
  code: string;
};
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';

export interface IAcademicSemester {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
}

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
