import React from "react"
import ReactMarkdown from "react-markdown"
import Img from "gatsby-image"
import "./modal.scss"

const Modal = ({ data, id, onClose, imageFieldName }) =>
  data.map(
    (item) =>
      item.id === id && (
        <div className="modal" key={item.id}>
          <div className="modal__content modal__contenido">
            <button className="modal__boton" onClick={onClose}>
              &times;
            </button>
            <div className="modal__body modal__cuerpo">
              {imageFieldName === undefined || (
                <Img
                  className="modal__imagen"
                  fluid={item[imageFieldName].childImageSharp.fluid}
                  title={item.titulo}
                  alt={""}
                />
              )}
              <h2 className="modal__titulo">{item.titulo}</h2>
              <ReactMarkdown
                className="modal__descripcion"
                source={item.contenido}
                escapeHtml={false}
              />
            </div>
          </div>
        </div>
      )
  )

export default Modal
