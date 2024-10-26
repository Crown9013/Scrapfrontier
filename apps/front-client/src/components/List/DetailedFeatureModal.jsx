import { useCallback, useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal } from "react-bootstrap";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'

const DetailedFeatureModal = (props) => {
    const {openModal, closeModal, refreshData, row} = props

    const ref = useRef();
    
    const [modalHeader, setModalHeader] = useState('New Featured')
    const [validated, setValidated] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false);

    const [originImage, setOriginImage] = useState(null)
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        // TODO: updating item

        const form = e.currentTarget;
        setValidated(true);

        if(form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            setIsProcessing(true)

            const formData = new FormData()
            if (image) formData.append('file', image)
            if (row) formData.append('_id', row._id)
            formData.append('title', title)
            formData.append('content', content)

            
            const config = {headers: {'Content-Type': 'multipart/form-data'}}
    
            try {
                const data = row ? await axios.put(`${process.env.REACT_APP_SERVER_URL}api/feature`, formData, config) : await axios.post(`${process.env.REACT_APP_SERVER_URL}api/feature`, formData, config)
                setIsProcessing(false)

                if (data.status === 200) {
                    refreshData()
                    closeModal()
                } else {
                    alert('Failed');
                }
            } catch(e) {
                console.error(e)
                alert(e.message)
                setIsProcessing(false)
            }
        }
    }

    const handleDelete = useCallback(async ()=>{
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}api/feature/${row._id}`).then((res)=>{
            if(res.status === 200) {
                refreshData()
                closeModal()
            } else {
                alert(res.message)
            }
        })
    },[])

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
        )
    }

    useEffect(() => {
        if(row) {
            setModalHeader('Edit Featured')
            setTitle(row.title)
            setContent(row.content)
            setOriginImage(row.image)
        } else {
            setImage(null)
            setTitle('')
            setContent('')
        }
    }, [row])

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
            ref.current?.focus();
        } else {
            ref.current?.close();
        }
    }, [openModal])

    return (
    <>
        <Modal show={openModal} onHide={closeModal}>
            <Form noValidate validated={validated} className="w-[100%]" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control required as="textarea" aria-label="textarea" rows={5} placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Add image here</Form.Label>
                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" onChange={(e)=>setImage(e.target.files[0])}/>
                    </Form.Group>
                    {/* <div>
                        <Image src={thumurl ? thumurl : TournamentImg1} width={150} height={150}/>
                    </div> */}
                    {originImage && <img src={`${process.env.REACT_APP_SERVER_URL}images/${originImage}`} alt="feautred" width={200} height={200} className="m-auto"/>}
                </Modal.Body>
                <Modal.Footer>
                    <CustomizedButton />
                </Modal.Footer>
            </Form>
        </Modal>
    </>
    )
}

export default DetailedFeatureModal