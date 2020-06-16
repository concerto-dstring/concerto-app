export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * 判断是否为图片文件
 */
export function isImageFile(fileName) {
  if (!/\.(jpg|jpeg|png|gif|bmp)$/.test(fileName.toLowerCase())) {
    return false;
  } else {
    return true;
  }
}
