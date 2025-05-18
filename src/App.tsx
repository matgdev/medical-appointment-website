import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Layout } from './Layout';
import { Login } from './Login';
import type React from 'react';
import { Appointments } from './Appointments';
import { Booking } from './Booking';

type frameKey = "login" | "appointments" | "booking";
interface frameValue {
    title: string,
    Frame: React.FC
}

const frameMap: Record<frameKey, frameValue> = {
    login: {title: "Dev's Hospital - Log in", Frame: Login},
    appointments: {title: "My appointments", Frame: Appointments},
    booking: {title: "Book Appointment", Frame: Booking}
}


function App({frame}: {frame: frameKey}) {

    const {title, Frame} = frameMap[frame];

    return(
        <Layout title={title}>
            <Frame />
        </Layout>
    );
}

export default App
