import { Response } from 'express';
import status from 'http-status';
import { UpdateUsernameInput } from '../schemas/user.schema';
import { checkIfUserExists, updateUsername } from '../services/user.service';
import { RequestWithBodyInput } from '../types';
import { HttpException } from '../utils/http-exception';

const updateUsernameHandler = async (
  req: RequestWithBodyInput<UpdateUsernameInput>,
  res: Response,
) => {
  // make sure can only update username if logged in as that user

  if (res.locals.user.userId !== req.body.userId)
    throw new HttpException(status.UNAUTHORIZED, 'unauthorized');

  const usernameAlreadyExists = await checkIfUserExists(
    'username',
    req.body.newUsername,
  );
  if (usernameAlreadyExists)
    throw new HttpException(status.CONFLICT, 'error updating username');

  const user = await updateUsername(req.body.userId, req.body.newUsername);
  if (!user) throw new HttpException(status.CONFLICT, 'error updating username');

  return res.status(status.OK).send({ username: req.body.newUsername });
};

export { updateUsernameHandler };
