import ContactUsForm from './ContactUsForm';

export default function ContactUsSection() {
  return (
    <div className="row">
      <div className="col-lg-5">
        <div>
          You can always contact us at our business WhatsApp. But we also offer
          you a more formal way of contacting. Submit the following form and we
          will contact you back as soon as possible.
        </div>
      </div>
      <div className="col-lg-7">
        <ContactUsForm />
      </div>
    </div>
  );
}
