import styled from '@emotion/styled';
import { motion } from "framer-motion";

const Card = styled(motion.a)`
    box-shadow: 0px .2rem .8rem rgba(0, 0, 0, 0.10);
    border-radius: .25rem;
    cursor: pointer;
    display: flex;

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
`
export default Card;