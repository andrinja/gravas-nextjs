import RitualHighlightCard from "../highlight-card/RitualHighlightCard";
import HighlightCardItems from "./style";

const RitualHighlightCards = ({ highlights }) => (
  <HighlightCardItems>
    {highlights.map(highlight => (
      <RitualHighlightCard key={highlight.label} {...highlight} />
    ))}
  </HighlightCardItems>
);

export default RitualHighlightCards