import ContactCard from "../contact/contact";
import { Container, ContactItems } from "./style";

const Contacts = ({ contactsText }) => (
  <Container>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2206.423262870855!2d24.292975951992755!3d56.42600394724105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e8c68267c7edb1%3A0x2a50ef7d3cd38a35!2sGravas%20atp%C5%ABtas%20komplekss!5e0!3m2!1sen!2sdk!4v1574069244669!5m2!1sen!2sdk"
      width="800"
      height="450"
      frameBorder="0"
      title="gravas atrasanas vieta"
    ></iframe>
    <ContactItems>
      {contactsText.map(contact => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </ContactItems>
  </Container>
);

export default Contacts;