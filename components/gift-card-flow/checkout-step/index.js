import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CardElement, injectStripe } from "react-stripe-elements";
import Step from "../step";
import STEPS from "../../../constants/steps";
import { withTranslation, i18n } from "../../../i18n";
import Button from "../../button/button";

const createOptions = () => {
  return {};
};

class CheckoutStep extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
 	state = {
    errorMessage: "",
    paying: false
  };

  handlePurchaseSuccess({ reference }) {
    const { setActiveStep, setReference, resetFlow } = this.props;
    setActiveStep(STEPS.find(step => step.key === "receipt"));
    resetFlow();
    setReference(reference);
  }

  handlePurchaseError({ error }) {
    console.error(error);
    this.props.setSnackbarText(error);
  }
  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  async submit(e) {
    const { shoppingCartItems, contacts, theme, note } = this.props;

    this.setState({ paying: true });

    const { error, token } = await this.props.stripe.createToken({
      name: "Name"
    });
    if (!error) {
      const body = {
        items: shoppingCartItems.map(({ id, persons, value, price }) => {
          return {
            id,
            persons,
            price
          };
        }),
        contacts,
        theme,
        note,
        total: shoppingCartItems.reduce((carry, item) => carry + item.price, 0),
        token: token.id,
        locale: i18n.language
      };
      let response = await fetch("/charge", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      this.setState({ paying: false });

      const data = await response.json();

      response.ok && data.error === undefined
        ? this.handlePurchaseSuccess(data)
        : this.handlePurchaseError(data);
    } else {
      console.error(error);
    }
  }

  render() {
    const { title, t } = this.props;
    return (
      <Step title={t(title)}>
        <CardElement
          onChange={this.handleChange}
          {...createOptions()}
          hidePostalCode
        />
        <p>4242 4242 4242 4242</p>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <Button
          onClick={this.submit}
          disabled={this.state.paying}
          type="button"
          buttonStyle="btn--primary--solid"
          style={{
            marginLeft: "auto",
            marginRight: 0
          }}
        >
			<React.Fragment>
              <span
                {...(this.state.paying && { style: { marginRight: "1rem" } })}
              >
                {t("pay")}
              </span>
              {this.state.paying && (
                <CircularProgress size={24} color="white" />
              )}
            </React.Fragment>
		</Button>
      </Step>
    );
  }
}

export default injectStripe(withTranslation("gift_cards")(CheckoutStep));
