import { SidebarChildrenType } from "@/types/client/dashboard.types";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CircleCheckBig } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { CiInboxIn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { Calendar1 } from "lucide-react";
import { Search } from "lucide-react";
import { Funnel } from "lucide-react";
import { Inbox } from "lucide-react";

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
