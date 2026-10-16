import HeaderText from './style';

// `title` is optional: section index pages put their h1 on the hero photo and
// only need the description here. `level` picks the heading element; pages
// without a hero title pass "h1".
const PageHeader = ({title = null, description = null, level = "h2"}) => {
    const Heading = level;
    return (
        <HeaderText>
            {title && <Heading className="title">{title}</Heading>}
            {description && <p className="description">{description}</p>}
        </HeaderText>
    );
}

export default PageHeader
