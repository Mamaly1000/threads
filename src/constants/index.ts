import home from "@/assets/home.svg";
import search from "@/assets/search.svg";
import heart from "@/assets/heart.svg";
import create from "@/assets/create.svg";
import community from "@/assets/community.svg";
import user from "@/assets/user.svg";
export const sidebarLinks = [
  {
    imgURL: home.src,
    route: "/",
    label: "Home",
  },
  {
    imgURL: search.src,
    route: "/search",
    label: "Search",
  },
  {
    imgURL: heart.src,
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: create.src,
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: community.src,
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: user.src,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];