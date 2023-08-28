import { useState } from "react";
import { Modal } from "react-bootstrap";
import style from "./modal.module.css";

const ModalComp = ({ show, handleClose, component, title, size }) => {
  const [dataFact, setDataFact] = useState({});

  return (
    <Modal
      show={show}
      centered="true"
      size={size ? size : "lg"}
      onHide={handleClose}>
      <Modal.Header className={style.modalHeader} closeButton>
        <h2 className="center-text">{title}</h2>
      </Modal.Header>
      <Modal.Body className={style.modalBody}>{component}</Modal.Body>
    </Modal>
  );
};

export default ModalComp;
