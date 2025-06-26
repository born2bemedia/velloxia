import React from "react";
import "@/styles/thankyou.scss";

const Thankyou = () => {
  return (
    <section className="thankyou">
      <div className="_container">
        <div className="thankyou__body">
          <h1>Thank You for Your Order!</h1>
          <p>
            We appreciate your choice of Velloxia. Our team will review <br />
            your order and reach out shortly to confirm the details.
            <br />
            <b>Thank you for your trust in us!</b>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Thankyou;
