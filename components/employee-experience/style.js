import styled from '@emotion/styled';

const Experience = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 8rem;

    .year {
        font-weight: ${props => props.theme?.fontWeight?.bold || 700};
        margin: 0 0 0.25rem 0;
    }

    .description {
        padding: 0.25rem 0;
        margin: 0;
    }
`

export default Experience;