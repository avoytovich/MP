import { formData, wrapRequest } from './api';
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

async function sendPhoto(file, query = 'PHOTO') {
  const fd = new FormData();
  fd.append('file', file, 'test.jpg');
  return await formData({
    method: 'POST',
    url: `files/upload?fileType=${query}`,
    data: fd,
  });
}

function getBase64(img) {
  const reader = new window.FileReader();
  reader.readAsDataURL(img);
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject('Error while parsing image');
    };
  });
}

async function getPhotoById(id) {
  const resp = await wrapRequest({
    responseType: 'blob',
    method: 'GET',
    url: `files/download/${id}`,
  });
  return await getBase64(resp.data);
}

export { sendPhoto, checkPhoto, getPhotoById };
