import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { withApollo } from "../../lib/apollo";
import { Elements, StripeProvider } from "react-stripe-elements";
import Snackbar from "@material-ui/core/Snackbar";
import styled from "@emotion/styled";

// Style
import Layout from "../../components/Layout";
import Container from "../../components/gift-card-flow/container/style";
import Content from "../../components/gift-card-flow/content/style";
import Stepper from "../../components/gift-card-flow/stepper/Stepper";

//Comps
import DesignStep from "../../components/gift-card-flow/design-step/DesignStep";
import SelectProductsStep from "../../components/gift-card-flow/select-products-step";
import EnterNoteStep from "../../components/gift-card-flow/enter-note-step";
import EnterContactsStep from "../../components/gift-card-flow/enter-contacts-step";
import CheckoutStep from "../../components/gift-card-flow/checkout-step";
import ReceiptStep from "../../components/gift-card-flow/receipt-step";
import ShoppingCart from "../../components/gift-card-flow/shopping-cart/ShoppingCart";
import Controls from "../../components/gift-card-flow/controls/Controls";

//Consts
import STEPS from "../../constants/steps";
import emailRegex from "../../constants/emailRegex";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { TR_NS } from '../../constants/translationNamespace';

const {t} = useTranslation(TR_NS.GIFT_CARDS);

const Headline = styled.h1`
  margin: 1rem 0;
  font-size: 1.5rem;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  color: ${p => p.theme.colors.primaryDark};
`;

const PurchasePage = () => {
  //UI STATE
  const [snackbarText, setSnackbarText] = useState("");
  const [stepper, setStepper] = useState(STEPS);
  const [activeStep, setActiveStep] = useState(STEPS[0]);
  const [isClient, setIsClient] = useState(false);

  //GIFT CARD FLOW STATE
  const [theme, setTheme] = useState(null);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  const [note, setNote] = useState();
  const [contacts, setContacts] = useState({});
  const [reference, setReference] = useState(null);

  //Runs when shoppingCartItems or contacts change
  useEffect(() => {
    // Complete select products step
    const selectProductsStep = getStep("select_products");
    completeStep(selectProductsStep, !!shoppingCartItems.length);

    // Complete enter contacts step
    const enterContactsStep = getStep("enter_contacts");
    completeStep(
      enterContactsStep,
      contacts.email && emailRegex.test(contacts.email)
    );

    // Needed for server side rendering
    setIsClient(true);

    //Throws user back to select products, if not in the first or last step
    //and there are no products in the shopping cart
    shoppingCartItems.length === 0 &&
      !["design", "receipt"].includes(activeStep.key) &&
      setActiveStep(getStep("select_products"));
  }, [shoppingCartItems, contacts]);

  //Methods

  // Resets flow to the initial state
  const resetFlow = () => {
    setTheme(null);
    setShoppingCartItems([]);
    setNote();
  };

  // Go back
  const handleBack = stepper => {
    const prevStep = getAdjacentStep(stepper, activeStep, false);
    setActiveStep(prevStep);
  };

  // Go forward
  const handleNext = (stepper, activeStep) => {
    const nextStep = getAdjacentStep(stepper, activeStep);
    setActiveStep(nextStep);
  };

  // Find step by key
  const getStep = key => stepper.find(step => step.key === key);

  // Sets complete value for a given step
  const completeStep = (CompleteableStep, value = true) => {
    setStepper(
      stepper.map(step => {
        if (step.key === CompleteableStep.key) {
          step.complete = value;
        }
        return step;
      })
    );
  };

  //gets either the prev or last step for the given step
  const getAdjacentStep = (stepper, activeStep, next = true) => {
    return stepper[
      stepper.findIndex(step => step.key === activeStep.key) + (next ? 1 : -1)
    ];
  };

  getAdjacentStep(stepper, activeStep, false);

  // Adds product to the shopping cart
  const addProduct = (product, data) => {
    setShoppingCartItems([
      ...shoppingCartItems,
      {
        uid: uniqid.time(),
        ...product,
        ...data
      }
    ]);
  };

  // Removes product from the shopping cart
  const removeProduct = product => {
    setShoppingCartItems(shoppingCartItems.filter(item => item !== product));
  };

  return (
    <Layout>
      <Container>
        <main>
          <Headline>{t("gift_card_flow_title")}</Headline>
          <Content>
            <Stepper steps={STEPS} activeStep={activeStep} />

            {/** Design step */}
            {activeStep.key === "design" && (
              <DesignStep
                handleThemeSelect={theme => {
                  setTheme(theme);
                  completeStep(activeStep);
                }}
                title={t("design_step_label")}
              />
            )}

            {/** Select products step */}
            {activeStep.key === "select_products" && (
              <SelectProductsStep
                title={t("select_products")}
                addProduct={addProduct}
              />
            )}

            {/** Enter note step */}
            {activeStep.key === "enter_note" && (
              <EnterNoteStep
                title={t("enter_note")}
                setNote={setNote}
                note={note}
              />
            )}

            {/** Enter contacts step */}
            {activeStep.key === "enter_contacts" && (
              <EnterContactsStep
                title={t("enter_contacts")}
                setContacts={setContacts}
                contacts={contacts}
              />
            )}

            {/** Checkout step */}
            {activeStep.key === "checkout" && isClient && (
              <StripeProvider apiKey="pk_test_Uqap0sSh0JYSl7UvbuE0R8b200kZ0uCOyb">
                <Elements>
                  <CheckoutStep
                    title={t("checkout")}
                    theme={theme}
                    note={note}
                    contacts={contacts}
                    shoppingCartItems={shoppingCartItems}
                    resetFlow={resetFlow}
                    setActiveStep={setActiveStep}
                    setReference={setReference}
                    setSnackbarText={setSnackbarText}
                  />
                </Elements>
              </StripeProvider>
            )}

            {/** Receipt step */}
            {activeStep.key === "receipt" && (
              <ReceiptStep title={t("receipt")} contactEmail={contacts.email} />
            )}
          </Content>
        </main>
        <ShoppingCart
          theme={theme}
          items={shoppingCartItems}
          note={note}
          removeProduct={removeProduct}
        />
      </Container>
      <Controls
        total={shoppingCartItems.reduce((total, item) => total + item.price, 0)}
        steps={STEPS}
        activeStep={activeStep}
        handleBack={() => handleBack(stepper)}
        handleNext={() => handleNext(stepper, activeStep)}
      />
      <Snackbar
        message={snackbarText}
        open={!!snackbarText}
        onClose={() => setSnackbarText("")}
      />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale),
	},
})

export default withApollo(PurchasePage);
