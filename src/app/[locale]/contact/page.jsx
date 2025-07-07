import ContactConnect from './_components/ContactConnect'
import ContactContact from './_components/ContactContact'
import ContactHero from './_components/ContactHero'
import ContactLocation from './_components/ContactLocation'

export const metadata = {
  title: 'Contact | Velloxia',
  description:
    "Reach out to Velloxia for any inquiries or support. We're here to assist you with your business needs. Contact us today!",
  openGraph: {
    title: 'Contact | Velloxia',
    description:
      "Reach out to Velloxia for any inquiries or support. We're here to assist you with your business needs. Contact us today!",
    images: 'https://velloxia.com/images/meta.png',
  },
}

export default function Contact() {
  return (
    <>
      <div className="contacts">
        <div className="contacts__container _container">
          <div className="contacts__body">
            <ContactHero />
            <ContactContact />
            <ContactConnect />
            <ContactLocation />
          </div>
        </div>
      </div>
    </>
  )
}
