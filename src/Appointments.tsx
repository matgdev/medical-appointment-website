import { Accordion, Button, Row, Stack } from "react-bootstrap";
import "./Appointments.css"
import { useNavigate } from "react-router";

const dummyData = [
    {"id": "1", "date":"2025-02-12T13:09:48Z","specialty":"General Practice","clinic":"WellSpring Family Clinic","address": "1420 Maple Avenue, Seattle, WA", "doctor":"Carolyn Nevitt"},
    {"id": "2", "date":"2024-07-28T00:32:01Z","specialty":"Pediatrics","clinic":"	Lakeside Pediatric Center", "address": "87 Willow St, Austin, TX","doctor":"Ryann Ionn"},
    {"id": "3", "date":"2025-04-04T13:34:50Z","specialty":"Dermatology","clinic":"	Downtown Dermatology Group", "address": "55 Market Street, San Francisco, CA","doctor":"Nestor O'Sherrin"}].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export function Appointments(){
    const navigate = useNavigate();

    const appointments = dummyData.map(({id, date, specialty, clinic, address, doctor}) => {
            return (
                <Accordion.Item eventKey={id} className="bg-secondary-subtle text-secondary-emphasis mb-3">
                    <Accordion.Header>
                        {   
                            Intl.DateTimeFormat(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            }).format(new Date(date))
                        }
                        <span className="mx-2">-</span>
                        <span className="fw-medium">{specialty}</span>
                    </Accordion.Header>
                    <Accordion.Body className="bg-transparent ms-5">
                        <Stack gap={3}>
                            <Stack direction="horizontal" className="align-items-start" gap={3}>
                                <div>Booked at:</div> 
                                <Stack>
                                    <div className="fw-bold">{clinic}</div>
                                    <div>{address}</div>
                                </Stack>
                            </Stack>
                            <div>With Dr. {doctor}</div>
                            <Stack 
                                direction="horizontal" 
                                gap={2}
                                className="justify-content-end">
                                <Button 
                                    variant="outline-danger"
                                    className="flex-grow-1 flex-md-grow-0 col-md-2">
                                        Cancel
                                </Button>
                                <Button 
                                    variant="outline-primary"
                                    className="flex-grow-1 flex-md-grow-0 col-md-2">
                                        Reschedule
                                </Button>
                            </Stack>
                        </Stack>
                    </Accordion.Body>
                </Accordion.Item>
            )
        }
    );

    return (
        <Stack className="px-3 justify-content-between">
                <Accordion flush className="bg-transparent">
                    {appointments}
                </Accordion>
            <Stack 
                direction="horizontal" 
                gap={2}
                className="col-3 justify-content-end w-100"
                >
                <Button 
                    onClick={() => navigate("/")}
                    className="flex-grow-1 flex-md-grow-0 col-md-2 rounded-0">Log out</Button>
                <Button 
                    onClick={() => navigate("/book-appointment")}
                    className="flex-grow-1 flex-md-grow-0 rounded-0">Book New Appoinment</Button>
            </Stack>
        </Stack>
        
    );
}