import "./Layout.css"
import type { JSX } from "react";
import { Container, Row } from "react-bootstrap";

interface LayoutProps {
    title: string,
    children: JSX.Element
}

export function Layout({title, children}: LayoutProps): JSX.Element {
    return (
        <Container fluid className="layout-container">
            <Row className="fs-1 d-flex align-items-center px-5 fw-bold border-bottom border-light border-3 shadow">{title}</Row>
            <Row>{children}</Row>
        </Container>
    );
}