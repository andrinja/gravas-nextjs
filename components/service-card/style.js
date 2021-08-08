import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Card = styled(motion.a)`
  text-decoration: none;
  box-shadow: 0px 0.2rem 0.8rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 230px;
    object-fit: cover;
    border-radius: 0.25rem 0.25rem 0 0;
  }

  .title {
    color: ${props => props.theme.colors.primary};
    padding: 1rem;
  }

  .detail-items {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 1rem 1rem;
    color: ${props => props.theme.fontColors.secondary};
  }
`;

export default Card;
