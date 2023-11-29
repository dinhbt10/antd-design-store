import React from "react";
import BackgroundImageContact from "../../assets/banner-stnc-5-1400x424-min.png";

const Homepage = () => {
  return (
    <div className="grid">
      <div
        className="flex justify-start items-center h-[70vh] px-5 text-[45px] font-bold text-white uppercase"
        style={{
          background: `url(${BackgroundImageContact})`,
          backgroundSize: "100% 100%",
        }}
      >
        Liên hệ
      </div>
      <div className="pt-6">
        <div className="p-5 leading-[50px]">
          <h2 className="text-[45px] font-bold text-[#656565] uppercase">
            <span className="text-[#12428c]">L</span>iên hệ <br />{" "}
            <span className="text-[#12428c]">V</span>ới chúng tôi
          </h2>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.649933584684!2d105.77630286793315!3d21.030147699753478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134553b2367ca7b%3A0x4aea87d9e3511e84!2sChung%20c%C6%B0%20Dolphin%20Plaza!5e0!3m2!1svi!2s!4v1701192831528!5m2!1svi!2s"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
