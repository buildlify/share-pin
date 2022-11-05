import { log } from '../utils/logger';
import { signJwt } from './jwt.service';
import mail from '@sendgrid/mail';
import { HttpException } from '../utils/http-exception';
import status from 'http-status';

const sendRegisterEmail = async (email: string) => {
  log.info(email);
  const token = signJwt(
    { email },
    { expiresIn: process.env.JWT_REGISTER_TOKEN_TTL },
  );

  mail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

  const message = {
    to: email,
    from: `${process.env.SENDGRID_SENDER}`,
    subject: 'Welcome to Sharepin!',
    html: `<strong>Please finish the registration process by clicking this link <a href="http://127.0.0.1:5173/#/register/${token}">Click Here</a></strong>`,
  };

  try {
    await mail.send(message);
    return true;
  } catch (error) {
    log.info(error);
    throw new HttpException(status.INTERNAL_SERVER_ERROR, 'email not sent');
  }
};

export { sendRegisterEmail };
