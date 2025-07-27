import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
	return (
		<div className="w-full flex justify-between">
			<DropdownMenu>
				<DropdownMenuTrigger className="hover:bg-gray-300 px-2 py-1 rounded-md">
					<div className="flex items-center gap-x-3 p-1 cursor-pointer">
						<img
							src="/logo.png"
							alt="user-profile-image"
							className="w-7 aspect-square rounded-full"
						/>
						<div className="flex gap-x-1">
							<p className="text-xs font-semibold">Abu</p>
							<IoIosArrowDown className="font-light text-gray-600" />
						</div>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Navbar;
