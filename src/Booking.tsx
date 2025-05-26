import { useState, type JSX } from "react";
import { Button, Col, Form, Modal, ProgressBar, Row, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Booking.css"


const dummyData = {
    specialties: ["General Practice", "Pediatrics", "Dermatology"],
    locations: ["WellSpring Family Clinic", "Lakeside Pediatric Center", "Downtown Dermatology Group"],
    doctors: ["Carolyn Nevitt", "Ryann Ionn", "Nestor O'Sherrin"],
    dateRange: [new Date(), new Date()]
}

{
    dummyData.dateRange[0].setHours(0, 0, 0, 0);
    dummyData.dateRange[1].setHours(0, 0, 0, 0);
    dummyData.dateRange[1].setMonth(dummyData.dateRange[1].getMonth() + 1);
}

export function Booking() {

    const [progress, setProgress] = useState(1);
    const [specialty, setSpecialty] = useState(-1);
    const [location, setLocation] = useState(-1);
    const [doctor, setDoctor] = useState(-1);
    const [date, setDate] = useState("");
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [submitDialog, setSubmitDialog] = useState({ type: "", message: "" });

    const specialties = dummyData.specialties.map((name, idx) => <option key={name} value={idx}>{name}</option>);
    const locations = dummyData.locations.map((name, idx) => <option key={name} value={idx}>{name}</option>);
    const doctors = dummyData.doctors.map((name, idx) => <option key={name} value={idx}>{name}</option>);
    const dateRange = dummyData.dateRange.map((date) => date.toISOString().split("T")[0]);

    const handleSubmit = () => {
        setShowConfirmationDialog(false);
        setProgress(5);
        setTimeout(() => setSubmitDialog({ type: "success", message: "Your appointment has been successfully booked." }), 2500);
    }

    const returnToField = (name: string) => {
        switch (name) {
            case "specialty":
                setLocation(-1);
                setDoctor(-1);
                setDate("");
                setProgress(1);
                break;
            case "location":
                setDoctor(-1);
                setDate("");
                setProgress(2);
                break;
            case "doctor":
                setDate("");
                setProgress(3);
                break;
            case "date":
                setProgress(4);
                break;
        }

        setShowConfirmationDialog(false);
    }

    const navigate = useNavigate();

    if (progress !== 5)
        return (
            <>
                <Stack className={`px-4 ${showConfirmationDialog === true ? "invisible" : "visible"}`} gap={2}>
                    <Row className="m-0" style={{ height: "5px" }}>
                        <ProgressBar now={progress * 25} className="px-0 h-100" />
                    </Row>

                    <Row className="m-0 flex-grow-1">
                        <Form className={`s-2 p-0`}>

                            <ControlGroup
                                id="specialty"
                                hide={progress !== 1}
                                onChange={(event) => setSpecialty(Number(event.target.value))}
                                value={specialty}
                                title="Select specialty"
                                buttonDisabled={(specialty >= 0 && specialty < specialties.length) === false}
                                onNext={() => setProgress((p) => p + 1)}
                            >
                                {specialties}
                            </ControlGroup>

                            <ControlGroup
                                id="location"
                                hide={progress !== 2}
                                onChange={(event) => setLocation(Number(event.target.value))}
                                value={location}
                                title="Select location"
                                buttonDisabled={(location >= 0 && location < locations.length) === false}
                                onNext={() => setProgress((p) => p + 1)}
                            >
                                {locations}
                            </ControlGroup>

                            <ControlGroup
                                id="doctor"
                                hide={progress !== 3}
                                onChange={(event) => setDoctor(Number(event.target.value))}
                                value={doctor}
                                title="Select doctor"
                                buttonDisabled={(doctor >= 0 && doctor < doctors.length) === false}
                                onNext={() => setProgress((p) => p + 1)}
                            >
                                {doctors}
                            </ControlGroup>

                            <ControlGroup
                                id="date"
                                hide={progress !== 4}
                                title="Select date"
                                buttonDisabled={(date !== "" && !isNaN(new Date(date).getTime()) && new Date(date) >= new Date(dateRange[0]) && new Date(date) <= new Date(dateRange[1])) === false}
                                onNext={() => setShowConfirmationDialog(true)}
                            >
                                <Form.Control type="date" min={dateRange[0]} max={dateRange[1]} onChange={(event) => setDate(event.target.value)} value={date} />
                            </ControlGroup>
                        </Form>
                    </Row>
                </Stack>

                <DetailsModal
                    returnToField={returnToField}
                    show={showConfirmationDialog}
                    specialty={specialty}
                    location={location}
                    doctor={doctor}
                    date={date}
                    onSubmit={handleSubmit}
                />
            </>
        );
    else {
        return (
            <>
                <div className={`w-100 d-flex flex-column justify-content-center align-items-center ${submitDialog.type === "" ? "visible" : "invisible"}`}>
                    <div>Submitting your booking...</div>
                    <div className="mb-3 text-center">Please wait a moment while we confirm your appointment.</div>
                    <div>
                        <Spinner variant="primary" />
                    </div>
                </div>

                <Modal show={submitDialog.type !== ""} centered>
                    <Modal.Body className="text-center" as={Stack} gap={3}>
                        {submitDialog.message}
                        <Button 
                        variant="outline-success"
                        onClick={() => navigate("/appointments")}>Close</Button>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

function ControlGroup({ id, value, onChange, title, children, buttonDisabled, onNext, hide }:
    { id: string, value?: string | number, onChange?: (event: any) => void, title?: string, children: JSX.Element | Array<JSX.Element>, buttonDisabled: boolean, onNext: () => void, hide: boolean }) {

    const navigate = useNavigate();
    const body = id === "date"
        ? <>{children}</>
        : (
            <Form.Select
                onChange={onChange}
                value={value}
            >
                <option value="-1">Click to show options...</option>
                {children}
            </Form.Select>
        );

    return (
        <Form.Group
            controlId={id}
            className={`h-100 ${hide === true ? " d-none" : ""}`}
            as={Stack}>

            <Form.Label className="fs-3 mb-2">{title}</Form.Label>

            {body}

            <Stack direction="horizontal" className="mt-auto w-100" gap={2}>
                <Button
                    variant="danger"
                    onClick={() => navigate("/appointments")}>
                    Cancel
                </Button>
                <Button
                    className="flex-grow-1"
                    disabled={buttonDisabled}
                    onClick={onNext}>
                    Next
                </Button>
            </Stack>


        </Form.Group>
    );

}

function DetailsModal({ returnToField, show, specialty, location, doctor, date, onSubmit }
    : { returnToField: (name: string) => void, show: boolean, specialty: number, location: number, doctor: number, date: string, onSubmit: () => void }) {

    const navigate = useNavigate();

    const children = [
        { title: "Specialty", name: dummyData.specialties[specialty], handler: () => returnToField("specialty") },
        { title: "Location", name: dummyData.locations[location], handler: () => returnToField("location") },
        { title: "Doctor", name: dummyData.doctors[doctor], handler: () => returnToField("doctor") },
        {
            title: "Date",
            name: (date !== "" && !isNaN(new Date(date).getTime())) ? Intl.DateTimeFormat(undefined, {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(new Date(`${date}T00:00`)) : "",
            handler: () => returnToField("date")
        }
    ].map(({ title, name, handler }) => {
        return (
            <Row key={title}>
                <Col xs="12" sm="2" className="fw-semibold">{title}</Col>
                <Col xs="12" sm>{name}</Col>
                <Col xs="12" sm="auto">
                    <Button
                        className="w-100"
                        variant="outline-primary"
                        onClick={handler}>
                        Change
                    </Button>
                </Col>
            </Row>
        );
    }
    );

    return (
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Confirm the details of your appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    {children}
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="rounded-0"
                    variant="danger"
                    onClick={() => navigate("/appointments")}>
                    Cancel
                </Button>
                <Button
                    className="rounded-0"
                    type="submit"
                    onClick={onSubmit}>
                    Confirm appointment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}