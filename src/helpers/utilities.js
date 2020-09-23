export function getFormBody(params) {
  let FormBody = [];
  for (let prop in params) {
    let encodedKey = encodeURIComponent(prop);
    let encodedValue = encodeURIComponent(params[prop]);
    FormBody.push(encodedKey + '=' + encodedValue);
  }
  return FormBody.join('&');
}
