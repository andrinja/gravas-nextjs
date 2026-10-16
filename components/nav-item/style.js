import styled from '@emotion/styled'
import { motion } from "framer-motion";

const Item = styled(motion.div)`
    color: ${props => props.theme.colors.ink};
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 0.875rem;
    padding: 0.625rem 0;
    font-size: ${props => props.theme.fonts.eyebrow};
    font-weight: ${props => props.theme.fontWeight.medium};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.25rem;
        height: 1px;
        background-color: transparent;
        transition: background-color .15s ease-in-out;
    }

    &:hover:after {
        background-color: ${props => props.theme.colors.secondaryDark};
    }

    &.active {
        color: ${props => props.theme.colors.primary};
        &:after {
            background-color: ${props => props.theme.colors.primary};
        }
    }
`
export default Item;
