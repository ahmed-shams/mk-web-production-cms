export const initialState = {
  File: {},
  addFileErrorReason: '',
  isAddingFile: false,
  fileAdded: false,
}

export const ADD_FILE_REQUEST = 'ADD_POST_REQUEST';
export const ADD_FILE_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_FILE_FAILURE = 'ADD_POST_FAILURE';

const dummyFile = {
  id: 1,
  parentId: 3,
  filename: 'EU_NS',
  User: {
    id: 1,
    nickname: 'sehwan'
  },
  content: '[JSON STRING IN ARRAY OF OBJECT]'
}


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE_REQUEST: {
      return {
        ...state,
        isAddingFile: true,
        addFileErrorReason: '',
        fileAdded: false,
      };
    };
    case ADD_FILE_SUCCESS: {
      return {
        ...state,
        isAddingFile: false,
        fileAdded: true,
        File: dummyFile
      }
    };
    case ADD_FILE_FAILURE: {
      return {
        ...state,
        isAddingFile: false, 
        fileAdded: false,
        addFileErrorReason: action.error
      }
    };
    default: {
      return {
        ...state
      }
    }
  }
}