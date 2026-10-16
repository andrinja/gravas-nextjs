import Link from 'next/link';
import ExploreCard from '../explore-card/ExploreCard'
import CardItems, { Section } from './style'

const Cards = ({ cards, title, allLabel, allHref = "/pirts-rituali" }) => (
    <Section aria-labelledby="explore-title">
        <div className="heading">
            <h2 id="explore-title">{title}</h2>
            {allLabel && <Link className="all" href={allHref}>{allLabel}</Link>}
        </div>
        <CardItems>
            {cards.map( card => (
                <ExploreCard key={card.id} {...card}/>
            ))}
        </CardItems>
    </Section>
)

export default Cards;
