import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReactDiffViewer from 'react-diff-viewer'

const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 300px;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ModalHeader= styled.div`
  display: flex;
   justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  background-color: black;
  color: white;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 200px;
`

const ModalClose = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;


const PreviewContent = styled.div`
  position: absolute;
  top: 200px;
`

//mk-style.min has css rules that are necessary for proper component rendering i.e. picture>img width: 100%

const DiffModal = ({ onClose }) => {
  const ContentContainer = useRef(null);
	console.log("diff modal");
	const oldCode = `
	{
	  "name": "Root-FRC-Folder",
	  "fileId": 33,
	  "toggled": false,
	  "userId": 1,
	  "content": [],
	  "children": [
	    {
	      "name": "EN_US",
	      "fileId": 34,
	      "content": [],
	      "children": [
	        {
	          "name": "women.js",
	          "fileId": 35,
	          "userId": 3,
	          "content": []
	        },
	        {
	          "name": "men.js",
	          "fileId": 36,
	          "content": [],
	          "userId": 2
	        },
	        {
	          "name": "sale.html",
	          "fileId": 37,
	          "content": [],
	          "userId": 1
	        },
	        {
	          "name": "handbag.js",
	          "fileId": 38,
	          "content": [],
	          "userId": 3
	        },
	        {
	          "name": "wallet.js",
	          "fileId": 39,
	          "content": [],
	          "userId": 2
	        }
	      ],
	      "active": false,
	      "toggled": true,
	      "userId": 2
	    },
	    {
	      "name": "gifts",
	      "fileId": 40,
	      "loading": true,
	      "children": [],
	      "content": [],
	      "userId": 3,
	    },
	    {
	      "name": "collection",
	      "fileId": 41,
	      "userId": 1,
	      "content": [],
	      "children": [
	        {
	          "name": "components",
	          "userId": 1,
	          "fileId": 42,
	          "content": [],
	          "children": [
	            {
	              "name": "Fall 2019.js",
	              "fileId": 43,
	              "content": [],
	              "userId": 2
	            },
	            {
	              "name": "16x9-banner.js",
	              "fileId": 44,
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
	          "fileId": 45,
	          "content": [],
	          "userId": 3
	        }
	      ]
	    },
	    {
	      "name": "Watches",
	      "fileId": 46,
	      "content": [],
	      "userId": 1,
	      "children": [
	        {
	          "name": "smartwatches.js",
	          "fileId": 47,
	          "content": [],
	          "userId": 1
	        },
	        {
	          "name": "Sophie.js",
	          "fileId": 48,
	          "content": [],
	          "userId": 2
	        }
	      ],
	      "active": false,
	      "toggled": true
	    },
	    {
	      "name": "men.js",
	      "fileId": 49,
	      "content": [],
	      "userId": 1
	    },
	    {
	      "name": "women.js",
	      "fileId": 50,
	      "content": [],
	      "userId": 2
	    },
	    {
	      "name": "Any File.json",
	      "fileId": 51,
	      "content": [],
	      "userId": 1
	    }
	  ],
	  "active": true
	}
  `;
  const newCode = `
	{
	  "name": "Root-FRC-Folder23333",
	  "fileId": 33,
	  
	  "userId": 1,
	  "content": [],
	  "children": [
	    {
	      "name": "EN_US",
	      "fileId": 34,
	      "content": [],
	      "children": [
	        {
	          "name": "women.js",
	          "fileId": 35,
	          "userId": 3,
	          "content": []
	        },
	        {
	          "name": "men.js",
	          "fileId": 36,
	          "content": [],
	          "userId": 2
	        },
	        {
	          "name": "sale.html",
	          "fileId": 37,
	          "content": [],
	          "userId": 1
	        },
	        {
	          "name": "handbag.js",
	          "fileId": 38,
	          "content": [],
	          "userId": 3
	        },
	        {
	          "name": "wallet.js",
	          "fileId": 39,
	          "content": [],
	          "userId": 2
	        }
	      ],
	      "active": false,
	      "toggled": true,
	      "userId": 2
	    },
	    {
	      "name": "gifts",
	      "fileId": 40,
	      "loading": true,
	      "children": [],
	      "content": [],
	      "userId": 3,
	    },
	    {
	      "name": "collection",
	      "fileId": 41,
	      "userId": 1,
	      "content": [],
	      "children": [
	        {
	          "name": "components",
	          "userId": 1,
	          "fileId": 42,
	          "content": [],
	          "children": [
	            {
	              "name": "Fall 2019.js",
	              "fileId": 43,
	              "content": [],
	              "userId": 2
	            },
	            {
	              "name": "16x9-banner.js",
	              "fileId": 44,
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
	          "fileId": 45,
	          "content": [],
	          "userId": 3
	        }
	      ]
	    },
	    {
	      "name": "Watches",
	      "fileId": 46,
	      "content": [],
	      "userId": 1,
	      "children": [
	        {
	          "name": "smartwatches.js",
	          "fileId": 47,
	          "content": [],
	          "userId": 1
	        },
	        {
	          "name": "Sophie.js",
	          "fileId": 48,
	          "content": [],
	          "userId": 2
	        }
	      ],
	      "active": false,
	      "toggled": true
	    },
	    {
	      "name": "men.js",
	      "fileId": 49,
	      "content": [],
	      "userId": 1
	    },
	    {
	      "name": "women.js",
	      "fileId": 50,
	      "content": [],
	      "userId": 2
	    },
	    {
	      "name": "Any File.json",
	      "fileId": 51,
	      "content": [],
	      "userId": 1
	    }
	  ]
	}
  `;
  return (
  <div>
  	<ModalContainer>
      <ModalHeader>Diff View</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent ref={ContentContainer}>
				<ReactDiffViewer
					oldValue={oldCode}
					newValue={newCode}
					splitView={true}
				/>
			</PreviewContent>
    </ModalContainer>
  </div>
  );

}


export default DiffModal;
