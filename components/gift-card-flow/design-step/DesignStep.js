import { useState } from "react";
import { withTranslation } from "../../../i18n";
import styled from "@emotion/styled";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "@apollo/react-hooks";
import GET_DESIGNS from "./queries/GetDesigns";
import { motion } from "framer-motion";
import { Tile as TileContainer } from "./style";
import Step from "../step";

const GridContainer = styled(motion.ul)`
  display: grid;
  grid-template-columns: 14rem 14rem;
  grid-auto-rows: 14rem;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const Grid = ({ children }) => {
  const animatedGrid = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  return (
    <GridContainer initial="hidden" animate="visible" variants={animatedGrid}>
      {children}
    </GridContainer>
  );
};

const DesignStep = ({ t, handleThemeSelect }) => {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const { loading, data } = useQuery(GET_DESIGNS);

  return (
    <Step title={t("design_title")}>
      {!loading ? (
        <Grid>
          {data.designs.map(({ name }) => (
            <Tile
              key={name}
              selected={name === selectedDesign}
              name={t(name)}
              value={name}
              imagePath={`/static/gift-card/designs/${name}.jpg`}
              handleSelect={name => {
                handleThemeSelect(name);
                setSelectedDesign(name);
              }}
            />
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </Step>
  );
};

export const Tile = ({ handleSelect, name, imagePath, selected, value }) => {
  const animatedTile = {
    visible: {
      opacity: 1
    },
    hidden: {
      opacity: 0
    }
  };

  return (
    <TileContainer
      variants={animatedTile}
      selected={selected}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleSelect(value)}
      key={name}
    >
      <Image src={imagePath} />
      <div className="name">{name}</div>
    </TileContainer>
  );
};

export default withTranslation("gift_cards")(DesignStep);
