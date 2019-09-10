import styled from "styled-components";

export const ComponentHeroBanner = styled.div`
  &.componentHeroBanner {
    .wpText {
        &.underline {
            border-bottom: 1px solid #000;
            white-space: nowrap;
        }
    }
    .facets-wrapper,
    .facets-wrapper-noGutter {
        width: 100%;
        margin: 0 auto;
        display: flex;
        padding-bottom: 30px;
        @media (min-width: 1025px) {
            padding-bottom: 25px;
        }
        li.activeCategory {
            .type-wrapper {
                a {
                    width: 100%;
                    display: inline-block;
                    border-bottom: 1px solid #000;
                }
            }
        }
        &.mouseHover {
            li.active {
                .type-wrapper {
                    a {
                        width: 100%;
                        display: inline-block;
                        border-bottom: 1px solid #000;
                    }
                }
                picture {
                    &:before { 
                        opacity: 0;
                    }
                }
            }
            picture {
                &:before { 
                    opacity: 1;
                }
            }
        }
        li {
            position: relative;
            width: 100%;
            padding-right: 7.5px;
            padding-left: 7.5px;
            .type-wrapper {
                padding: 0;
                text-align: center;
                margin: 0 auto;
                .type-slug-2 {
                    position: relative;
                    padding-top: 15px;
                    padding-bottom: 15px;
                }
            }
            a {
                display: block;
                position: relative;
            }
        }
        picture {
            display: block;
            position: relative
            &:before {
                background-color: rgba(0,0,0,.5);
                content: "";
                display: block;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1;
                opacity: 0;
                -webkit-transition: opacity .3s ease-out,-webkit-transform .2s ease-out;
                transition: opacity .3s ease-out,-webkit-transform .2s ease-out;
            }
        }
    }
    .facets-wrapper-noGutter {
        li {
            padding-left: 0;
            padding-right: 0;
        }
    }
    .heroBannerSlot1 {
        max-width: 1025px;
        @media (min-width: 768px) and (max-width:1024px) {
            max-width:680px;
        }
    }
    .heroBannerSlot2 {
        max-width: 302.8px;
        @media (min-width: 1025px) {
            max-width:550px;
        }
    }
    .heroBannerSlot2-noGutter {
        max-width: 272.8px;
        @media (min-width: 1025px) {
            max-width:520px;
        }
    }
    .heroBannerSlot2-wide {
        max-width: 302.8px;
        @media (min-width: 1025px) {
            max-width:680px;
        }
    }
    .heroBannerSlot2-wide-noGutter {
        max-width: 272.8px;
        @media (min-width: 1025px) {
            max-width:650px;
        }
    }
    .heroBannerSlot3 {
        max-width: 454.2px;
        @media (min-width: 1025px) {
            max-width:825px;
        }
    }
    .heroBannerSlot3-noGutter {
        max-width: 409.2px;
        @media (min-width: 1025px) {
            max-width:780px;
        }
    }
    .heroBannerSlot3-wide {
        max-width: 454.2px;
        @media (min-width: 1025px) {
            max-width:1020px;
        }
    }
    .heroBannerSlot3-wide-noGutter {
        max-width: 409.2px;
        @media (min-width: 1025px) {
            max-width:975px;
        }
    }
    .heroBannerSlot4 {
        max-width: 605.6px;
        @media (min-width: 1025px) {
            max-width:880px;
        }
    }
    .heroBannerSlot4-noGutter {
        max-width: 545.6px;
        @media (min-width: 1025px) {
            max-width:820px;
        }
    }    
    .heroBannerSlot5 {
        max-width: 757px;
        @media (min-width: 1025px) {
            max-width:1100px;
        }
    }
    .heroBannerSlot5-noGutter {
        max-width: 682px;
        @media (min-width: 1025px) {
            max-width:1025px;
        }
    }
    .banner-copies {
        max-width: 870px;
        margin: 0 auto;
        text-align: center;
        .type-copy-caslon-deck {
            display: inline;
            &:before,
            &:after {
                display: inline;
            }
        }
        a {
            display: inline;
            margin-top: 15px;
            &:first-child {
                display: block;
                margin-top: 0;
            }
        }
    }
`;
