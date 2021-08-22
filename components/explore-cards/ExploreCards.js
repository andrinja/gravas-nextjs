import ExploreCard from '../explore-card/ExploreCard'
import CardItems from './style'

const Cards = ({ cards }) => (
    <CardItems>
        {cards.map( card => (
            <ExploreCard key={card.id} {...card}/>
        ))}
    </CardItems>
)

export default Cards;
