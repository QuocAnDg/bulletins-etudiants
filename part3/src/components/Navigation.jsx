import React from "react";
import { Nav } from "react-bootstrap";
import { BookOpen, Users, ClipboardList } from "lucide-react";
import Logo_ULB from "../assets/logo_ulb.png";
import "../App.css"
function Navigation() {
  return (
    <div className="d-flex flex-column p-3" style={{ width: "250px"}}>
      <img 
        src={Logo_ULB}
        alt="Logo Navigation" 
        className="mb-4" 
      />
      <Nav className="flex-column sidebar">
        <Nav.Link href="/" className="d-flex align-items-center sidebar-link">
          <BookOpen size={18} className="me-2" />
          Cours
        </Nav.Link>
        <Nav.Link href="/inscriptions" className="d-flex align-items-center sidebar-link">
          <Users size={18} className="me-2" />
          Inscriptions
        </Nav.Link>
        <Nav.Link href="/notes" className="d-flex align-items-center sidebar-link">
          <ClipboardList size={18} className="me-2" />
          Notes
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Navigation;
