import { Router } from 'express';
import use from '../../utils/promise-wrapper';
import { postController } from '../../controllers';
import validate from '../../middlewares/validate-schema';
import { createPostSchema, updateVoteCountSchema } from '../../schemas/post.schema';
import requireUser from '../../middlewares/require-user';

const router = Router();

router.post(
  '/create',
  requireUser,
  validate(createPostSchema),
  use(postController.createPostHandler),
);
router.post(
  '/votes',
  requireUser,
  validate(updateVoteCountSchema),
  use(postController.updateVoteCountHandler),
);

router.get('/:id', requireUser, use(postController.getPostHandler));

router.get('/user/:id', requireUser, use(postController.getUsersPostsHandler));

export default router;
