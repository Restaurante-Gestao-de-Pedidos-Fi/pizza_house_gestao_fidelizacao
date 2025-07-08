import Modal from "react-bootstrap/Modal";
import FormularioItem from "./FormularioItem";

const ModalItemForm = ({
  show,
  setShow,
  title,
  addItem,
  updateItem,
  targetItem,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header
        closeButton
        style={{ background: " #ff9624", fontFamily: "ChunkFive Print" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormularioItem
          cancel={handleClose}
          createItem={addItem}
          updateItem={updateItem}
          targetItem={targetItem}
        ></FormularioItem>
      </Modal.Body>
    </Modal>
  );
};

export default ModalItemForm;
