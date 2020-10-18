export const TYPES = {
  signupUser: 'user/SIGN_UP',
  loginUser: 'user/LOGIN',
  userLoggedIn: 'user/LOG_IN_COMPLETE',
  userLoginFailed: 'user/LOG_IN_ERROR',
}

export const signupUser = (username, password) => ({type: TYPES.signupUser, payload: {username, password}})
export const loginUser = (username, password) => ({type: TYPES.loginUser, payload: {username, password}})
export const userLoggedIn = (token) => ({type: TYPES.userLoggedIn, payload: token})
export const userLoginFailed = (error) => ({type: TYPES.userLoginFailed, payload: error})
