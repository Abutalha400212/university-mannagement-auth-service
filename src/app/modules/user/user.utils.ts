import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId as string) + 1)
    .toString()
    .padStart(5, '0');

  incrementId = `${academicSemester?.year.substring(2)}${academicSemester?.code}${incrementId}`;
  return incrementId;
};
