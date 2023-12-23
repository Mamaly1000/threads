import home from "@/assets/home.svg";
import search from "@/assets/search.svg";
import heart from "@/assets/heart.svg";
import create from "@/assets/create.svg";
import community from "@/assets/community.svg";
import user from "@/assets/user.svg";
import tag from "@/assets/tag.svg";
import members from "@/assets/members.svg";
import reply from "@/assets/reply.svg";
import request from "@/assets/request.svg";
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
  { value: "threads", label: "Threads", icon: reply.src },
  { value: "replies", label: "Replies", icon: members.src },
  { value: "tagged", label: "Tagged", icon: tag.src },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: reply.src },
  { value: "members", label: "Members", icon: members.src },
  { value: "requests", label: "Requests", icon: request.src },
];
