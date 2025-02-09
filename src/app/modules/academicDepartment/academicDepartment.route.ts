import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import express from 'express';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:id', AcademicDepartmentController.getAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

export const AcademicDepartmentRoutes = router;
