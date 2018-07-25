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
  console.log(fd);
  fd.append('file', file, 'test.jpg');
  await formData({
    method: 'POST',
    url: 'files/upload?fileType=PHOTO',
    data: fd,
  });
}

export { sendPhoto, checkPhoto };
