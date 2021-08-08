import styled from '@emotion/styled'
import { motion } from "framer-motion";

const Item = styled(motion.a)`
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 1rem;

    &:before {
            content: '';
            display: flex;
            height: .2rem;
            width: 100%;
            background-color: transparent;
            position: absolute;
            top: calc(100% - .2rem);
            left: 0;
            transition: background-color .15s ease-in-out;
        }

    &:hover {
        &:before {
            background-color: ${props => props.theme.colors.secondary};
        }
    }

    &.active {
        &:before {
            background-color: ${props => props.theme.colors.primary};
        }
    }
`
export default Item;