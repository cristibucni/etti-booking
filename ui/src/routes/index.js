import {
  EventNote,
  MeetingRoom,
  Apartment,
  Dashboard as DashboardIcon,
  Person,
} from "@mui/icons-material";
import { Bookings } from "../containers/bookings";
import { Buildings } from "../containers/buildings";
import { Dashboard } from "../containers/dashboard";
import { Rooms } from "../containers/rooms";
import { Users } from "../containers/users";

const routes = [
  {
    name: "Dashboard",
    component: Dashboard,
    icon: DashboardIcon,
    path: "/home",
  },
  { name: "Bookings", component: Bookings, icon: EventNote, path: "/bookings" },
  { name: "Rooms", component: Rooms, icon: MeetingRoom, path: "/rooms" },
  {
    name: "Buildings",
    component: Buildings,
    icon: Apartment,
    path: "/buildings",
  },
  {
    name: "Users",
    component: Users,
    icon: Person,
    path: "/users",
  },
];

export { routes };
