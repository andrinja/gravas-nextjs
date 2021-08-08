import React from "react";
import Button from "../../button/button";
import { Footer, ControlItems, ShoppingAmount } from "./style";
import { withTranslation } from "../../../i18n";

const Controls = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  t,
  total = 0
}) => {
  const isFirstStep =
    steps.findIndex(step => step.key === activeStep.key) === 0;

  const isLastStep =
    steps.findIndex(step => step.key === activeStep.key) === steps.length - 1;
  return (
    <Footer>
      <ControlItems>
        {!isLastStep && (
          <React.Fragment>
            <Button
              onClick={handleBack}
              disabled={isFirstStep || isLastStep}
              type="button"
              buttonStyle="btn--primary--solid"
            >
			{t("back_button")}
			</Button>

            <Button
              disabled={!activeStep.complete}
              onClick={handleNext}
              type="button"
              buttonStyle="btn--primary--outline"
            >
			{t("next_button")}
			</Button>
          </React.Fragment>
        )}
      </ControlItems>

      {!isLastStep && (
        <React.Fragment>
          <ShoppingAmount>€ {total}</ShoppingAmount>
        </React.Fragment>
      )}
    </Footer>
  );
};

export default withTranslation("gift_cards")(Controls);
