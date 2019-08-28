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
  "content": [],
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
              "name": "16x9-banner.js",
              "userId": 1,
              "content": [{
                "componentId": "banner16by9",
                "globalOptions": {
                  "data_linkcontainer": "PROMO 1",
                  "personalization": "personalized id",
                  "gutters": false,
                  "fullbleed": false,
                  "padding": {
                    "top": "",
                    "bottom": "ext-padding-100"
                  },
                  "background": {
                    "image": {
                      "src": "",
                      "repeat": "none",
                      "position": "",
                      "size": "cover"
                    },
                    "color": "#FFFFFF",
                    "inner_color": "blue"
                  },
                  "hide_mobile": false,
                  "hide_desktop": false,
                  "hide_tablet": false
                },
                "imageOptions": {
                  "imgSrc": {
                    "mobile": "https://digital1.michaelkors.com/refreshes/2019/spring/refresh4/global/mobile/homepage/HP_PROMO_1.jpg",
                    "tablet": "https://digital1.michaelkors.com/refreshes/2019/spring/refresh4/global/desktop/homepage/HP_PROMO_1.jpg",
                    "desktop": "https://digital1.michaelkors.com/refreshes/2019/spring/refresh4/global/desktop/homepage/HP_PROMO_1.jpg",
                    "fallback": "https://digital.michaelkors.com/refreshes/2019/spring/refresh1/global/mobile/homepage_1-29/HP_PROMO_1.jpg",
                    "alt": "test image"
                  },
                  "imgInfo": {
                    "link_url": "/women/_/N-28ee",
                    "data_icid": "FEEL THE LOVE",
                    "tabindex": -1,
                    "aria": {
                      "hidden": true,
                      "label": "test hello"
                    }
                  },
                  "lazyload": false,
                  "disclaimer": {
                    "html": true,
                    "text": "<span>This is a disclaimer text - <a href='www.google.com'>click here for detail</a></span>",
                    "text_align": "center"
                  }
                },
                "textOptions": {
                  "type_wrapper": {
                    "padding": {
                      "top": "",
                      "bottom": "int-padding-30"
                          },
                          "caption_width_desktop": "75%",
                          "caption_width_tablet": "80%",
                          "caption_width_mobile": "90%",
                    "text_align": "center",
                          "mobile_left_to_center": false,
                          "color": "red"
                  },
                  "slug": {
                    "text": "Lorem Ipsum",
                    "fontfamily": "type-slug-eu",
                    "link": "http://www.google.com/",
                    "data_icid": "headline data icid",
                    "tabindex": -1,
                    "aria_hidden": true,
                    "aria_label": "test hello",
                    "padding": {
                      "top": "int-padding-30",
                      "bottom": "int-padding-30"
                    }
                  },
                  "typedivider": true,
                  "texts": [{
                      "classprop": "wpHeadline",
                      "text": "50% Width, Whiteny-Caslon Type Style",
                      "fontfamily": "type-headline-h2-large",
                      "link": "http://www.google.com/",
                      "tabindex": -1,
                      "aria_hidden": true,
                      "aria_label": "test hello",
                      "data_icid": "headline data icid",
                      "padding": {
                        "top": "",
                        "bottom": "int-padding-30"
                      },
                      "svg": {
                        "src_desktop": "https://digital.michaelkors.com/sales/2019/test/25_OFF_SALE_desktop.svg",
                        "src_mobile": "https://digital.michaelkors.com/sales/2019/test/25_OFF_SALE_mobile.svg",
                        "alt": "Buy Buy Buy",
                        "width_mobile": "300px",
                        "width_tablet": "80vw",
                        "width_desktop_s": "700px",
                        "width_desktop_l": "80%"
                      }
                    },
                    {
                      "classprop": "wpText",
                      "text": "Bus ac tus; nostis lina, nicapeciem. Vala es! Serit, se mussenatia ta se nihi, denatid serem morte inercerfinat fordiem, in Itam cut furo notiliam intiliam ocum P. Sentiam satabem conoret vivilic iistiae ad consusp eculles intiam.",
                      "textTablet": "Hello Tablet Text Here",
                      "textMobile": "Hello Mobile Text Here",
                      "fontfamily": "type-copy-caslon-deck",
                      "link": "http://www.google.com/maps",
                      "tabindex": -1,
                      "aria_hidden": false,
                      "aria_label": "test aria 2",
                      "data_icid": "body copy data_icid",
                      "padding": {
                        "top": "",
                        "bottom": "int-padding-30"
                      },
                      "color":"blue"
                    },
                    {
                      "classprop": "wpText",
                      "text": "Bus ac tus; nostis lina, nicapeciem. Vala es! Serit, se mussenatia ta se nihi, denatid serem morte inercerfinat fordiem, in Itam cut furo notiliam intiliam ocum P. Sentiam satabem conoret vivilic iistiae ad consusp eculles intiam.",
                      "fontfamily": "type-copy-caslon-deck",
                      "link": "http://www.google.com/maps",
                      "tabindex": -1,
                      "aria_hidden": false,
                      "aria_label": "test hello 3",
                      "data_icid": "body copy data_icid",
                      "padding": {
                        "top": "",
                        "bottom": "int-padding-30"
                      },
                      "color":"#2980b9"
                    }
                  ],
                  "ctaDefault": {
                    "ctas": [{
                      "text": "SHOP MEN'S NEW ARRIVALS",
                      "show_mobile_only": false,
                      "link": "http://www.google.com",
                      "data_icid": "SHOP NOW Data icid",
                      "aria_label": "SHOP NOW",
                      "padding": {
                        "top": "",
                        "bottom": "int-padding-30"
                      }
                    },
                    {
                      "text": "SHOP WOMEN",
                      "show_mobile_only": false,
                      "link": "http://www.reddit.com",
                      "data_icid": "women data icid test",
                      "aria_label": "shop there now",
                      "padding": {
                        "top": "",
                        "bottom": ""
                      }
                    }],
                    "isEU": false,
                    "color": "black"
                  }
                }
              }]
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