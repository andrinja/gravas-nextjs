import Image from "next/image";
import Link from "next/link";
import { Rows, Row } from "./style";
import { ActionLink } from "../hero/style";
import { useTranslation } from 'next-i18next/pages';

// `rows` is static/data/index-page/serviceDescriptions.json: label/text/cta
// are keys in the given namespace; img and href are literal.
const ServiceRows = ({ rows, translationNamespace }) => {
  const { t } = useTranslation(translationNamespace);
  return (
    <Rows>
      {rows.map((row, index) => (
        <Row key={row.id} flip={index % 2 === 1} id={row.anchor}>
          <div className="photo">
            <Image
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              src={row.img}
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="copy">
            <span className="number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            <h2>{t(row.label)}</h2>
            <p>{t(row.text)}</p>
            {row.cta && (
              <ActionLink as={Link} href={row.href} className="primary cta">
                {t(row.cta)}
              </ActionLink>
            )}
          </div>
        </Row>
      ))}
    </Rows>
  );
};

export default ServiceRows;
