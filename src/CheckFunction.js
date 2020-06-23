/**
 * 检查字符串由可以包含字母、数字、中文和_, 长度为2-30
 * @param {*} str
 */
export function checkStrWithUserName(str) {
  let match = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1}([\u4e00-\u9fa5a-zA-Z0-9]|[_]){1,19}$/;
  if (match.test(str)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 检查字符串长度必须大于等于6
 * @param {*} str
 */
export function checkStrWithPassword(str) {
  if (str && str.length >= 8) {
    return true;
  } else {
    return false;
  }
}

/**
 * 检查字符串长度为手机号码
 * @param {*} str
 */
export function checkStrWithPhone(str) {
  let pattern = /^(?:13\d|15\d|18[123456789])-?\d{5}(\d{3}|\*{3})$/;

  if (pattern.test(str)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 检查字符串为邮箱
 * @param {*} str
 */
export function checkStrWithEmail(str) {
  let pattern = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;

  if (pattern.test(str)) {
    return true;
  } else {
    return false;
  }
}
