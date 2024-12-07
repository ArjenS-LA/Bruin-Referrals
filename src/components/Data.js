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
    name: "search",
    path: "search",
    icon: <PagesIcon />,
  },
  {
    id: 3,
    name: "profile",
    path: "profile",
    icon: <UserIcon />,
  },
  {
    id: 4,
    name: "admin",
    path: "admin",
    icon: <UserIcon />,
  },
  {
    id: 5,
    name: "logout",
    path: "logout",
    icon: <AuthIcon />,
    action: "logout",
  },
];
