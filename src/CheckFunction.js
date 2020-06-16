/**
 * 检查字符串由字母开头，可以包含字母、数字和_, 长度为5-30
 * @param {*} str
 */
export function checkStrWithUserName(str) {
  let match = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,29}$/;
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
  if (str && str.length >= 6) {
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
  let pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  if (pattern.test(str)) {
    return true;
  } else {
    return false;
  }
}
