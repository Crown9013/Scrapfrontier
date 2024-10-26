import { useEffect, useRef, useState, useCallback } from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Image, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { formatDateStr } from "../../helper";

import 'bootstrap/dist/css/bootstrap.css'

const DetailedTournamentModal = (props) => {
    const {openModal, closeModal, refreshData, row} = props

    const ref = useRef();

    const [validated, setValidated] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false);

    const [originImage, setOriginImage] = useState(null)
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [capacity,setCapacity] = useState(0)
    const [description, setDescription] = useState('')

    const handleDelete = useCallback(async ()=>{
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}api/tournament_and_events/${row._id}`).then((res)=>{
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
            formData.append('name', name)
            formData.append('date', date)
            formData.append('time', time)
            formData.append('capacity', capacity)
            formData.append('description', description)
            
            const config = {headers: {'Content-Type': 'multipart/form-data'}}
    
            try {
                const data = row ? await axios.put(`${process.env.REACT_APP_SERVER_URL}api/tournament_and_events`, formData, config) : await axios.post(`${process.env.REACT_APP_SERVER_URL}api/tournament_and_events`, formData, config)
                setIsProcessing(false)

                if (data.status === 200) {
                    refreshData()
                    closeModal()
                } else {
                    alert('Failed');
                }
            } catch(e) {
                console.error(e)
                setIsProcessing(false)
                alert('Failed');
            }
        }
    }

    useEffect(() => {
        if(row) {
            setName(row.name)
            setDate(row.date)
            setTime(row.time)
            setCapacity(row.capacity)
            setDescription(row.description)
            setOriginImage(row.image)
        } else {
            setOriginImage(null)
            setImage(null)
            setDate('')
            setTime('')
            setCapacity('')
            setName('')
            setDescription('')
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

    useEffect(() => {
        if(parseInt(capacity) < 0) {
            alert('Invalid Capacity')
            setCapacity(0)
        }
        console.log(date)
    }, [capacity, date])

    return (
    <>
        <Modal show={openModal} onHide={closeModal}>
            <Form noValidate validated={validated} className="w-[100%]" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Tournament And Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="mm/dd/yyyy" value={date} onChange={(e) => setDate(e.target.value)}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control required type="number" placeholder="Capacity" value={capacity} onChange={(e)=>setCapacity(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control required as="textarea" aria-label="textarea" rows={5} placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Add image here</Form.Label>
                        <Form.Control type="file" accept=".jpg" onChange={(e)=>setImage(e.target.files[0])}/>
                    </Form.Group>
                    {originImage && <img src={`${process.env.REACT_APP_SERVER_URL}images/${originImage}`} alt="tournament_events" width={200} height={200} className="m-auto"/>}
                </Modal.Body>
                <Modal.Footer>
                    <CustomizedButton />
                </Modal.Footer>
            </Form>
        </Modal>
    </>
    )
}

export default DetailedTournamentModal