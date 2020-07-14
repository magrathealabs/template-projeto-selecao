export const isAuthenticated = () => {

  let isLoggedIn = localStorage.getItem('isLoggedIn');
  let user = JSON.parse(localStorage.getItem('user')); 
  
  if (isLoggedIn && user.id && user.login) {
    return true;

  } else {
    return false;
  }

}
