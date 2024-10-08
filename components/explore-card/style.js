import styled from '@emotion/styled';
import { motion } from "framer-motion";

export const Card = styled(motion.div)`
    box-shadow: 0px .2rem .8rem rgba(0, 0, 0, 0.10);
    border-radius: .25rem;
    cursor: pointer;
    display: flex;
	text-decoration: none;
	color: ${props => props.theme.fontColors.primary};

    img {
        width: 100px;
        height: 100%;
        object-fit: cover;
        border-radius: .25rem 0 0 .25rem;
    }
    .label {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
    }
`;
