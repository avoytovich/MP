import { NotificationManager } from 'react-notifications';
// type = info || success || warning || error

export const createNotification = (
  type = 'error',
  title = '',
  msg = '',
  callback = () => null,
) => {
  if (typeof type === 'object') {
    return NotificationManager[type.type](
      type.msg,
      type.title,
      5000,
      type.callback,
    );
  }
  return NotificationManager[type](msg, title, 5000, callback);
};
