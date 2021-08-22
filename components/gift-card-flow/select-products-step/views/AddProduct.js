import { useState, useEffect, useCallback } from "react";
import { withTranslation } from "../../../../i18n";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import styled from "@emotion/styled";
import Button from "../../../button/button";
import Image from "next/image";

export const InputCard = styled.div`
  display: flex;
  align-items: center;
  height: 8rem;
  margin: 2rem 1rem 2rem 0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  padding-right: 1.5rem;

  .image {
    height: 8rem;
    width: 8rem;
    flex-shrink: 0;
    margin-right: 1em;
    object-fit: cover;
  }

  h3 {
    margin-right: auto;
  }

  .MuiTextField-root {
    width: 5rem;
    margin: 0 0.5rem;
  }
`;

export const AddProductControls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  align-items: center;

  span {
    margin-right: 1rem;
    font-size: ${p => p.theme.fonts.headline5};
    color: ${p => p.theme.colors.darkGrey};
  }

  button {
    margin-right: 0;
  }
`;

const AddProduct = ({ t, product, handleAddProduct }) => {
  const [persons, setPersons] = useState(1);
  const [price, setPrice] = useState();

  useEffect(() => {
    handlePriceChange();
  }, [persons, handlePriceChange]);

  const handlePersonsInput = desiredPersonsCount => {
    if (desiredPersonsCount >= 1) {
      if (
        (product.price_type.name === "absolute" &&
          product.prices.some(
            price => price.persons === desiredPersonsCount
          )) ||
        product.price_type.name === "per_person"
      ) {
        setPersons(desiredPersonsCount);
      }
    }
  };

  const handlePriceChange = useCallback(() => {
    switch (product.price_type.name) {
      case "absolute":
        setPrice(
          product.prices.find(price => price.persons === persons).amount
        );
        break;
      case "per_person":
        setPrice(product.prices[0].amount * persons);
        break;
    }
  }, [setPrice, product, persons]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleAddProduct(product, {
          persons,
          price
        });
      }}
    >
      <InputCard>
        <Image
          className="image"
          src={`/static/gift-card/products/${product.name}.jpg`}
          alt=""
        />
        <h3>{t(product.name)}</h3>
        <IconButton
          size="small"
          onClick={() => handlePersonsInput(persons - 1)}
        >
          <Remove />
        </IconButton>

        <TextField
          variant="outlined"
          label={t("persons")}
          name="persons"
          type="number"
          value={persons}
          min={1}
          onChange={e => handlePersonsInput(Number(e.target.value))}
        />
        <IconButton
          size="small"
          onClick={() => handlePersonsInput(persons + 1)}
        >
          <Add />
        </IconButton>
      </InputCard>
      <AddProductControls>
        <span>€ {price}</span>
        <Button>{t("add")}</Button>
      </AddProductControls>
    </form>
  );
};

export default withTranslation("gift_card")(AddProduct);
