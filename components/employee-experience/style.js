import styled from '@emotion/styled';

const Experience = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 8rem;

    .year {
        font-family: ${props => props.theme.families.display};
        font-size: ${props => props.theme.fonts.headline5};
        font-weight: ${props => props.theme.fontWeight.semibold};
        color: ${props => props.theme.colors.secondaryDark};
        margin: 0 0 0.125rem 0;
    }

    .description {
        padding: 0;
        margin: 0;
        font-size: ${props => props.theme.fonts.caption};
        color: ${props => props.theme.fontColors.disabled};
    }
`

export default Experience;
