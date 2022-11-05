import { Router } from 'express';
import { userController } from '../../controllers';
import requireUser from '../../middlewares/require-user';
import validate from '../../middlewares/validate-schema';
import { updateUsernameSchema } from '../../schemas/user.schema';
import use from '../../utils/promise-wrapper';

const router = Router();

router.put(
  '/update-username',
  requireUser,
  validate(updateUsernameSchema),
  use(userController.updateUsernameHandler),
);

export default router;
