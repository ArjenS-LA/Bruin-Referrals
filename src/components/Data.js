// src/components/Data.js
import {
  HomeIcon,
  LayoutIcon,
  CalendarIcon,
  InvoiceIcon,
  UserIcon,
  RolesIcon,
  PagesIcon,
  AuthIcon,
} from "./Icons";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "home",
    path: "home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "layouts",
    path: "layouts",
    icon: <LayoutIcon />,
  },
  {
    id: 3,
    name: "calendar",
    path: "calendar",
    icon: <CalendarIcon />,
  },
  {
    id: 4,
    name: "invoice",
    path: "invoice",
    icon: <InvoiceIcon />,
  },
  {
    id: 5,
    name: "admin",
    path: "admin",
    icon: <UserIcon />,
  },
  {
    id: 6,
    name: "login",
    path: "login",
    icon: <RolesIcon />,
  },
  {
    id: 7,
    name: "search",
    path: "search",
    icon: <PagesIcon />,
  },
  {
    id: 8,
    name: "logout",
    path: "logout",
    icon: <AuthIcon />,
    action: "logout",
  },
  {
    id: 9,
    name: "profile",
    path: "profile",
    icon: <UserIcon />,
  }
];
