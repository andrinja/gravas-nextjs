import HeaderText from './style';

const PageHeader = ({title, description}) => (
    <HeaderText>
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
    </HeaderText>
)

export default PageHeader