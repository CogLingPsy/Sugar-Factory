import Cookies from 'js-cookie'

export function setLoggedIn (value) {
  Cookies.set('loggedIn', value)
}

export function loggedIn () {
  const isLoggedIn = Cookies.get('loggedIn') === 'true'
  return isLoggedIn
}
