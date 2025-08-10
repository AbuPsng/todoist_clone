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
import { MdDeleteForever, MdOutlineFavoriteBorder } from "react-icons/md";
import { SidebarChildrenType } from "@/types/client/dashboard.types";
import { CiCalendarDate, CiInboxIn, CiSearch } from "react-icons/ci";

export const SIDEBAR_LINK: SidebarChildrenType[] = [
	{
		Icon: Search,
		title: "Search",
	},
	{
		Icon: Inbox,
		title: "Inbox",
	},
	{
		Icon: Calendar1,
		title: "Today",
	},
	{
		Icon: CalendarDays,
		title: "Upcoming",
	},
	{
		Icon: Funnel,
		title: "Filter & Labels",
	},
	{
		Icon: CircleCheckBig,
		title: "Completed",
	},
];

export const PROFILE_LINKS: SidebarChildrenType[] = [
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

export const SUB_PROJECT_DROPDOWN_MENU_LIST: SidebarChildrenType[] = [
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
