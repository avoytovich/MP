import { formData } from './api';
import { createNotification } from './notification';

function checkPhoto(file) {
  if (file.size > 5000000) {
    createNotification({
      type: 'error',
      title: 'Too big photo',
      message: '',
    });
    return false;
  }
  return true;
}

async function sendPhoto(file) {
  const fd = new FormData();
  fd.append('file', file, 'test.jpg');
  return await formData({
    method: 'POST',
    url: 'files/upload?fileType=PHOTO',
    data: fd,
  });
}

export { sendPhoto, checkPhoto };
