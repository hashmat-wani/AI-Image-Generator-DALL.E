export function getCookie(name) {
  const value = `; ${decodeURIComponent(document.cookie)}`;

  const parts = value.split(`; ${name}=`);
  return parts.pop().split(";").shift();
}
