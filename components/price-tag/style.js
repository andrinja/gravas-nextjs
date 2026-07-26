import styled from '@emotion/styled'
const Item = styled.div`
    padding: 1rem;
    border: 1px solid ${props => props.theme.fontColors.divider};
    border-radius: 0.5rem;
    height: 18rem;
    display: flex;
    flex-direction: column; 
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    span {
        font-size: 3rem;
        color: ${props => props.theme.colors.secondaryDark};
    }
    
    & > * {
        margin: 0.5rem 0;
    }

    p {
        color: ${props => props.theme.fontColors.disabled};
    }

`
export default Item;