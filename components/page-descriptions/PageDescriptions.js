import ServiceDescriptions from "./style";
// import { withTranslation } from "../../i18n";
import { useTranslation } from 'next-i18next';

export const Descriptions = ({ descriptions, translationNamespace}) => {
	const { t } = useTranslation(translationNamespace);
  return (
    <ServiceDescriptions>
      {descriptions.map(description => (
        <div className="item" key={description.id}>
          <h3 className="label">{t(description.label)}</h3>
          <p className="description">{t(description.text)}</p>
        </div>
      ))}
    </ServiceDescriptions>
  );
}