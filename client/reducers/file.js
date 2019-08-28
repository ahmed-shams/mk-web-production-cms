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
  "name": "Root-FRC-Folder",
  "toggled": false,
  "userId": 1,
  "children": [
    {
      "name": "EN_US",
      "children": [
        {
          "name": "women.js",
          "userId": 3
        },
        {
          "name": "men.js",
          "userId": 2
        },
        {
          "name": "sale.html",
          "userId": 1
        },
        {
          "name": "handbag.js",
          "userId": 3
        },
        {
          "name": "wallet.js",
          "userId": 2
        }
      ],
      "active": false,
      "toggled": true,
      "userId": 2
    },
    {
      "name": "gifts",
      "loading": true,
      "children": [],
      "userId": 3,
    },
    {
      "name": "collection",
      "userId": 1,
      "children": [
        {
          "name": "components",
          "userId": 1,
          "children": [
            {
              "name": "Fall 2019.js",
              "userId": 2
            },
            {
              "name": "Michael's World.js",
              "userId": 1
            }
          ]
        },
        {
          "name": "Clothing.js",
          "userId": 3
        }
      ]
    },
    {
      "name": "Watches",
      "userId": 1,
      "children": [
        {
          "name": "smartwatches.js",
          "userId": 1
        },
        {
          "name": "Sophie.js",
          "userId": 2
        }
      ],
      "active": false,
      "toggled": true
    },
    {
      "name": "men.js",
      "userId": 1
    },
    {
      "name": "women.js",
      "userId": 2
    },
    {
      "name": "Any File.json",
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