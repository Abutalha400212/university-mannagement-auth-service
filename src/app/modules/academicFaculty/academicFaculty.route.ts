import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import express from 'express';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:id', AcademicFacultyController.getAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRoutes = router;
