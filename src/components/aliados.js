import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const aliadosLogos = () => {
  return (
    <ul className="aliados__carrusel">
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/aliados-morgan-stanley.png"
          alt="Logo Morgan Stanley"
        />
      </li>
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/aliados-intesa-sanpaolo.jpeg"
          alt="Logo Intesa San Paolo"
        />
      </li>
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/aliados-vitral.jpeg"
          alt="Logo Vitral"
        />
      </li>
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/aliados-credit-suisse.png"
          alt="Logo Credit Suisse"
        />
      </li>
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/alidos-oppenheimer.jpeg"
          alt="Logo Oppenheimer"
        />
      </li>
      <li className="aliados__carrusel-item">
        <StaticImage
          src="../assets/images/aliados-silk.jpeg"
          alt="Logo Silk"
        />
      </li>
    </ul>
  );
};

export default aliadosLogos;
