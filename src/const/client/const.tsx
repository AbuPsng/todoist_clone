import {
	Calendar1,
	CalendarDays,
	CircleCheckBig,
	Edit2Icon,
	Funnel,
	Inbox,
	Plus,
	Search,
} from "lucide-react";
import {
	SidebarChildrenType,
	SidebarDropdownChildrenType,
} from "@/types/client/dashboard.types";
import { MdDeleteForever, MdOutlineFavoriteBorder } from "react-icons/md";
import { CiCalendarDate, CiInboxIn, CiSearch } from "react-icons/ci";

export const SIDEBAR_LINK: SidebarChildrenType[] = [
	{
		Icon: Search,
		title: "Search",
		link: "search",
	},
	{
		Icon: Inbox,
		title: "Inbox",
		link: "inbox",
	},
	{
		Icon: Calendar1,
		title: "Today",
		link: "today",
	},
	{
		Icon: CalendarDays,
		title: "Upcoming",
		link: "upcoming",
	},
	{
		Icon: Funnel,
		title: "Filter & Labels",
		link: "filterAndLabel",
	},
	{
		Icon: CircleCheckBig,
		title: "Completed",
		link: "completed",
	},
];

export const PROFILE_LINKS: SidebarDropdownChildrenType[] = [
	{
		Icon: CiSearch,
		title: "tasks",
	},
	{
		Icon: CiInboxIn,
		title: "setting",
	},
	{
		Icon: CiCalendarDate,
		title: "logout",
	},
];

export const SUB_PROJECT_DROPDOWN_MENU_LIST: SidebarDropdownChildrenType[] = [
	{
		Icon: Plus,
		title: "Add Project",
	},
	{
		Icon: Edit2Icon,
		title: "Edit Project",
	},
	{
		Icon: MdOutlineFavoriteBorder,
		title: "Add to favorite",
	},
	{
		Icon: Plus,
		title: "Add Task",
	},
	{
		Icon: MdDeleteForever,
		title: "Delete Project",
	},
];
