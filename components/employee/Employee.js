import { useState } from "react";
import EmployeeExperience from "../employee-experience/EmployeeExperience";
import Button from "../button/button";
import { EmployeeDetails, ModalItems } from "./style";
import Modal from "react-responsive-modal";
import PhoneIcon from "../../components/icons/Phone";
import EmailIcon from "../../components/icons/Mail";
import Image from "next/image";
import { TR_NS } from '../../constants/translationNamespace';
import { useTranslation } from 'next-i18next';

const Users = ({ employee}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {t} = useTranslation(TR_NS.EMPLOYEES);
  return (
    <EmployeeDetails>
      <div className="left-column">
        <h2 className="role-title">{t(employee.title)}</h2>
      </div>
      <div className="right-column">
        <div className="image-and-timeline">
          <div className="image-wrapper">
            <Image height={112} width={112} objectFit="cover" className="image" src={employee.img} alt={employee.alt} />
          </div>
          <div className="timeline">
            {employee.educations.map(education => (
              <EmployeeExperience key={education.year} {...education} />
            ))}
          </div>
        </div>
        <p className="description">{t(employee.description)}</p>
          <div>
            <Button
            onClick={() => setIsModalOpen(true)}
            type="button"
            buttonStyle="btn--primary--outline"
			>
              {t(employee.contact)}
			</Button>
            <Modal
              center
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <ModalItems>
                <h2>{t(employee.getInTouchTitle)}</h2>
                <p>{t(employee.getInTouchDescription)}</p>
                <div className="contacts">
                  <PhoneIcon style={{ color: "#1E514B", fontSize: "36px" }} />
                  <a className="contact-detail" href="tel:+37126647133">
                    +371 26647133
                  </a>
                </div>
                <div className="contacts">
                  <EmailIcon style={{ color: "#1E514B", fontSize: "36px" }} />
                  <a className="contact-detail" href="mailto:info@gravas.lv">
                    info@gravas.lv
                  </a>
                </div>
              </ModalItems>
            </Modal>
          </div>
      </div>
    </EmployeeDetails>
  );
};

export default Users;
