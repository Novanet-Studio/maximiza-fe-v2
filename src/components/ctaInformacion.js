import React from "react"
import LinkNav from "./linkNav"


const ctaInformacion = ({ estilo, link, mensaje, textoBoton }) => (
  <section className="cta-informacion">
    <h4 className="cta-informacion__mensaje">{mensaje}</h4>   
    <LinkNav estilo={estilo} text={textoBoton} to={link} />
  </section>
)

export default ctaInformacion
