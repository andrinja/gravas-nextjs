import GuesthouseHighlightCard from '../highlight-card/GuesthouseHighlightCard';
import HighlightCardItems from './style';

const GuesthouseHighlightCards = ({highlights}) => (
   <HighlightCardItems>
    {highlights.map(highlight => (
        <GuesthouseHighlightCard key={highlight.label} {...highlight}/>
    ))}
   </HighlightCardItems> 
)

export default GuesthouseHighlightCards