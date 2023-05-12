export default function ContactUsForm() {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="contact-us-name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Your name."
            id="contact-us-name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-us-company-name" className="form-label">
            Company
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Company name."
            id="contact-us-company-name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-us-email" className="form-label">
            Email
          </label>
          <input
            placeholder="Your e-mail address so we can contact you."
            required
            className="form-control"
            type="email"
            id="contact-us-email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-us-email" className="form-label">
            Message
          </label>
          <textarea
            placeholder="Feel free to go ahead and tell us a bit about how we can help."
            required
            className="form-control"
            id="contact-us-email"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
