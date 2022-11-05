import { Router } from 'express';
import { authController } from '../../controllers';
import validate from '../../middlewares/validate-schema';
import {
  loginUserSchema,
  registerNewUserSchema,
  verifyEmailSchema,
} from '../../schemas/auth.schema';
import use from '../../utils/promise-wrapper';

const router = Router();

router.post(
  '/verify-email',
  validate(verifyEmailSchema),
  use(authController.verifyEmailHandler),
);

router.get(
  '/validate-register-token/:token',
  use(authController.validateRegisterTokenHandler),
);

router.post(
  '/register',
  validate(registerNewUserSchema),
  use(authController.registerNewUserHandler),
);

router.post(
  '/login',
  validate(loginUserSchema),
  use(authController.loginUserHandler),
);

export default router;
