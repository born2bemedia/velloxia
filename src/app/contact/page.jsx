import ContactConnect from "./_components/ContactConnect";
import ContactContact from "./_components/ContactContact";
import ContactHero from "./_components/ContactHero";
import ContactLocation from "./_components/ContactLocation";


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
    );
}
