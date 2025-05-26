import "./Layout.css"
import type { JSX } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface LayoutProps {
    title: string,
    children: JSX.Element
}

export function Layout({ title, children }: LayoutProps): JSX.Element {
    return (
        <Container fluid className="layout-container">
            <Row className="fs-1 d-flex align-items-center px-5 fw-bold border-bottom border-light border-3 shadow justify-content-center">
                <Col className="col-12" style={{ maxWidth: "1400px" }}>
                    {title}
                </Col>
            </Row>
            <Row className="py-4 align-self-center col-12" style={{ maxWidth: "1400px" }}>
                {children}
            </Row>
        </Container>
    );
}