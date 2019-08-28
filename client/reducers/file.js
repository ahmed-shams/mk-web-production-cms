export const initialState = {
  Files: {},
  addFileErrorReason: '',
  isAddingFile: false,
  fileAdded: false,
  isLoadingFile: false,
  fileLoadded: false
}

export const ADD_FILE_REQUEST = 'ADD_POST_REQUEST';
export const ADD_FILE_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_FILE_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_ALL_FILE_REQUEST = 'LOAD_ALL_FILE_REQUEST';
export const LOAD_ALL_FILE_SUCCESS = 'LOAD_ALL_FILE_SUCCESS';
export const LOAD_ALL_FILE_FAILURE = 'LOAD_ALL_FILE_FAILURE';

const dummyFile = {
  "name": "react-treebeard",
  "toggled": false,
  "userId": 1,
  "children": [
    {
      "name": "example",
      "children": [
        {
          "name": "app.js",
          "userId": 3
        },
        {
          "name": "data.js",
          "userId": 2
        },
        {
          "name": "index.html",
          "userId": 1
        },
        {
          "name": "styles.js",
          "userId": 3
        },
        {
          "name": "webpack.config.js",
          "userId": 2
        }
      ],
      "active": false,
      "toggled": true,
      "userId": 2
    },
    {
      "name": "node_modules",
      "loading": true,
      "children": [],
      "userId": 3,
    },
    {
      "name": "src",
      "userId": 1,
      "children": [
        {
          "name": "components",
          "userId": 1,
          "children": [
            {
              "name": "decorators.js",
              "userId": 2
            },
            {
              "name": "treebeard.js",
              "userId": 1
            }
          ]
        },
        {
          "name": "index.js",
          "userId": 3
        }
      ]
    },
    {
      "name": "themes",
      "userId": 1,
      "children": [
        {
          "name": "animations.js",
          "userId": 1
        },
        {
          "name": "default.js",
          "userId": 2
        }
      ],
      "active": false,
      "toggled": true
    },
    {
      "name": "Gulpfile.js",
      "userId": 1
    },
    {
      "name": "index.js",
      "userId": 2
    },
    {
      "name": "package.json",
      "userId": 1
    }
  ],
  "active": true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_FILE_REQUEST: {
      return {
        ...state,
        isLoadingFile: true
      };
    };
    case LOAD_ALL_FILE_SUCCESS: {
      return {
        ...state,
        Files: dummyFile,
        isLoadingFile: false,
        fileLoadded: true
      };
    };
    case LOAD_ALL_FILE_FAILURE: {
      return {
        ...state,
        isLoadingFile: false,
        fileLoadded: false
      };
    };
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