import { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.css";
import { axiosInterface } from "../../../../utils";

const DetailedHowtostartModal = (props) => {
  const { openModal, closeModal, refresh, row } = props;

  const ref = useRef();

  const [modalHeader, setModalHeader] = useState("New 'How To Start'");
  const [validated, setValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setIsProcessing(true);

      const formData = new FormData();
      if (row) formData.append("_id", row._id);
      formData.append("title", title);
      formData.append("content", content);

      try {
        const data = row
          ? await axiosInterface('put', 'howtostart', formData)
          : await axiosInterface('post', 'howtostart', formData)
        setIsProcessing(false);

        if (data.status === 200) {
          refresh();
          closeModal();
        } else {
            toast.error("Failed");
        }
      } catch (e) {
        console.error(e);
        toast.error(e.message);
        setIsProcessing(false);
      }
    }
  };

  const handleDelete = useCallback(async () => {
    axiosInterface('delete', `howtostart/${row._id}`, {})
      .then((res) => {
        if (res.status === 200) {
          refresh();
          closeModal();
        } else {
          toast.error(res.message);
        }
      });
  }, [closeModal, refresh, row]);

  const CustomizedButton = () => {
    return (
      <>
        {row && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" disabled={isProcessing}>
          {isProcessing ? "Saving..." : "Save"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (row) {
      setModalHeader("Edit 'How To Start'");
      setTitle(row.title);
      setContent(row.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [row]);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      ref.current?.focus();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <>
      <Modal show={openModal} onHide={closeModal}>
        <Form
          noValidate
          validated={validated}
          className="w-[100%]"
          onSubmit={handleSubmit}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                required
                as="textarea"
                aria-label="textarea"
                rows={5}
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <CustomizedButton />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DetailedHowtostartModal;
