import React, { useState } from "react";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarLogo,
  SidebarBrand,
  SidebarToggler,
} from "./SidebarStyles";
import BrandLogo from "../../assets/Ucla-logo.png";

import { SidebarItems } from "..";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer displaySidebar={displaySidebar}>
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
            {/* Logo Wrapper */}
            <SidebarLogo href="#">
              <span>
                <img
                  src={BrandLogo}
                  alt="Brand logo"
                  style={{ width: "100px", height: "auto" }}
                />
              </span>
              <SidebarBrand
                displaySidebar={displaySidebar}
                className="app_brand_text"
              ></SidebarBrand>
            </SidebarLogo>
            {/* Logo Wrapper ends */}
            {/* Toggle Button(s) */}
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={handleSidebarDisplay}
            >
              <div className="outer_circle">
                <div className="inner_circle" />
              </div>
            </SidebarToggler>
          </SidebarLogoWrapper>
          {/* Render Sidebar components */}
          <SidebarItems displaySidebar={displaySidebar} />
        </SidebarWrapper>
      </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
}
