import "./Contact.css";

function Contact() {
  return (
    <section className="contact">
      <div className="contact-container">
        <h2>📞 تواصل معنا</h2>
        <form>
          <input type="text" placeholder="الاسم" required />
          <input type="email" placeholder="البريد الإلكتروني" required />
          <textarea placeholder="اكتب رسالتك هنا..." rows="4" required></textarea>
          <button type="submit">إرسال</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
