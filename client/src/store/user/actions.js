export const TYPES = {
  signupUser: 'user/SIGN_UP',
  userSignedUp: 'user/SIGN_UP_COMPLETE',
  userSignUpFailed: 'user/SIGN_UP_ERROR',
}

export const signupUser = (username, password) => ({type: TYPES.signupUser, payload: {username, password}})
export const userSignedUp = (token) => ({type: TYPES.userSignedUp, payload: token})
export const userSignUpFailed = (error) => ({type: TYPES.userSignUpFailed, payload: error})
