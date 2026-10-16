import ServiceDescriptions from "./style";
// import { withTranslation } from "../../i18n";
import { useTranslation } from 'next-i18next/pages';

export const Descriptions = ({ descriptions, translationNamespace}) => {
	const { t } = useTranslation(translationNamespace);
  return (
    <ServiceDescriptions>
      {descriptions.map(description => (
        <div className="item" key={description.id}>
          <h2 className="label">{t(description.label)}</h2>
          <p className="description">{t(description.text)}</p>
        </div>
      ))}
    </ServiceDescriptions>
  );
}