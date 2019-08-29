import styled, { css } from 'styled-components';

const InnerContainer = styled.div`
    margin: 0 auto;
    ${props => props.desktopwidthprop !== undefined && css`
        width: ${props => props.desktopwidthprop};
    `}
    ${props => props.tabletwidthprop !== undefined && css`
        @media (max-width: 1024px) {
        width: ${props => props.tabletwidthprop};
    }
    `}
    ${props => props.mobilewidthprop !== undefined && css`
        @media (max-width: 768px) {
        width: ${props => props.mobilewidthprop};
    }
    `}
    ${props => props.mobile_left_to_center && css`
        text-align: center;
        @media (min-width: 768px) {
            text-align: left;
        }
    `}
`;

export default InnerContainer;
