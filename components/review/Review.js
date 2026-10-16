import Item, { ReviewList } from './style'

const Review = ({reviews}) => {
    return (
        <ReviewList>
            {reviews.map(review => (
                <Item key={review.name}>
                    <p>{review.description}</p>
                    <footer>{review.name}</footer>
                </Item>
            ))}
        </ReviewList>
    )
}

export default Review;
