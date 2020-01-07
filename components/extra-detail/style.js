import styled from '@emotion/styled'

const Item = styled.div`
    
    .detail {
        display: grid;
        grid-template-columns: 15% 85%;
    }
    .line {
        height: 1px;
        width: 100%;
        background: black;
        margin: 2rem 0;
        background: ${props => props.theme.colors.primary};
    } 
    @media (max-width: 720px) {
        .detail {
            grid-template-columns: none;
            justify-content: center; 
            text-align: center;
        }
    }
`
export default Item;