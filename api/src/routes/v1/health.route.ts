import { Response, Router } from 'express';

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *  get:
 *     tags:
 *     - Health
 *     description: Responds if the app is running
 *     responses:
 *       200:
 *         description: App Is Running
 */

router.get('/', (_, res: Response) =>
  res.status(200).json({ message: 'app is running' }),
);

export default router;
