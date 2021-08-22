import { Step, StepTitle } from "./style.js";

const GiftCardStep = ({ children, title }) => (
  <Step>
    <StepTitle>{title}</StepTitle>
    {children}
  </Step>
);

export default GiftCardStep;
