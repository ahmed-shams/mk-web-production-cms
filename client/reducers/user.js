const dummyUser = {
  id: 1,
  nickname: 'Sehwan Choi',
  Files: []
}

export const initialState = {
  isLoggingOut: false,
  isLoggingIn: false,
  logInErrorReason: '',
  isLoggedIn: false,
  isSignedUp: false,
  isSigningUp: false,
  signUpErrorReason: '',
  me: null, // my info
}

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; 

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';


export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: ''
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: action.data,
        isLoading: false,
      }
    };
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        logInErrorReason: action.error,
        me: null
      }
    };
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.error,
        me: null,
      };
    };
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      };
    };
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      };
    };
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: '',
      };
    };
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignedUp: true,
        isSigningUp: false,
        // me: dummyUser 
      }
    };
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        isSigningUp: false,
        signUpErrorReason: action.error
      }
    };
    default: {
      return {
        ...state
      }
    }
  }
};
