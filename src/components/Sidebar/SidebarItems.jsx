import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import {
  ItemsList,
  ItemContainer,
  ItemWrapper,
  ItemName,
} from "./SidebarStyles";

import { dummyData } from "..";

const SidebarItems = ({ displaySidebar }) => {
  const [activeItem, setActiveItem] = useState(dummyData[0]?.id || null);
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <ItemsList>
      {dummyData.map((itemData) => (
        <ItemContainer
          key={itemData.id}
          /* Adding active class when the user clicks */
          className={itemData.id === activeItem ? "active" : ""}
        >
          {itemData.action === "logout" ? (
            <ItemWrapper
              onClick={() => {
                setActiveItem(itemData.id);
                signOut();
              }}
              style={{ cursor: "pointer" }}
            >
              {itemData.icon}
              <ItemName displaySidebar={displaySidebar}>
                {itemData.name}
              </ItemName>
            </ItemWrapper>
          ) : (
            <Link to={itemData.path} onClick={() => setActiveItem(itemData.id)}>
              <ItemWrapper>
                {itemData.icon}
                <ItemName displaySidebar={displaySidebar}>
                  {itemData.name}
                </ItemName>
              </ItemWrapper>
            </Link>
          )}
        </ItemContainer>
      ))}
    </ItemsList>
  );
};

export default SidebarItems;
