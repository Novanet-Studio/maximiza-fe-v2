import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./modal.scss";

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
                <GatsbyImage
                  className="modal__imagen"
                  image={getImage(item[imageFieldName].localFile)}
                  title={item.titulo}
                  alt={item.titulo}
                />
              )}
              <h2 className="modal__titulo">{item.titulo}</h2>
              <ReactMarkdown
                className="modal__descripcion"
                children={item.contenido}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
              />
            </div>
          </div>
        </div>
      )
  );

export default Modal;
