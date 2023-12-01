import React from "react";
import { Accordion, Button } from "react-bootstrap";

export default function Notifications() {
  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "40px" }}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            style={{
              backgroundColor: "#0A3056",
              color: "white",
              fontWeight: "bold",
              padding: "10px 10px",
              borderBottom: "1px solid #e3e3e3",
              cursor: "pointer",
            }}
          >
            New notification
          </Accordion.Header>
          <Accordion.Body
            style={{
              padding: "15px",
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#333",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f2f7fb",
            }}
          >
            <div>
              Tutor has Accepted your appointment request
              <h5 style={{ marginBottom: "10px", color: "#555" }}>
                Date and Time:
              </h5>
              <h5>Place: </h5>
            </div>
            <div>
              <Button
                style={{
                  width: "80px",
                  backgroundColor: "#0A3056",
                  borderColor: "#0A3056",
                }}
                variant="danger"
              >
                delete
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
