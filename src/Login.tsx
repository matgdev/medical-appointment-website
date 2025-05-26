import type React from "react";
import { type JSX, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router";

export function Login(): JSX.Element{

    const [credentials, setCredentials] = useState({username: "", passwd: ""});
    const navigate = useNavigate();

    const updateCredentialsValue = (key: "username" | "passwd", value: string) => {
        setCredentials((currentCredentials: typeof credentials) => {
            const newCredentials = {...currentCredentials};
            newCredentials[key] = value;
            return newCredentials;
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate("appointments");
    }

    return(
        <Form onSubmit={handleSubmit} className="fs-2">
            <Stack gap={3} className="col-10 col-sm-8 col-xl-4 mx-auto h-100 justify-content-center">
                <Form.Group as={Stack} controlId="username" className="flex-grow-0 mb-3">
                    <Form.Label className="text-start">Username</Form.Label>
                    <Form.Control 
                        onChange={(e) => updateCredentialsValue("username", e.target.value)}
                        className="fs-3 color-bg-input rounded-0"/>
                </Form.Group>
                <Form.Group as={Stack} controlId="password" className="flex-grow-0">
                    <Form.Label className="text-start">Password</Form.Label>
                    <Form.Control 
                        onChange={(e) => updateCredentialsValue("passwd", e.target.value)}
                        type="password"
                        className="fs-3 color-bg-input rounded-0"
                    />
                </Form.Group>
                <a href="/" className="text-start flex-grow-0 mb-4 mt-2">Forgot your password?</a>
                <Stack className="col-md-4 mx-auto flex-grow-0" gap={4}>
                    <Button type="submit" className="fs-3 rounded-0">Log in</Button>
                    <Button className="fs-3 rounded-0">Sign up</Button>
                </Stack>
                
            </Stack>
        </Form>
    );
}