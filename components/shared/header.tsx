import React from "react";
import { cn } from "@/lib/utils";
import { Container } from ".";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn("", className)}>
			<Container className="flex items-center justify-between py-8">
				<div className="flex items-center gap-4">
					<Image src="/logo.png" width={60} height={60} alt="logo" />
					<div className="flex flex-col">
						<h1 className="text-3xl uppercase font-black">Just Toss</h1>
						<p className="text-sm text-gray-400 leading-3">
							Health in harmony with nature
						</p>
					</div>
				</div>
				<div></div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1.5">
						<User size={16} />
						Enter
					</Button>

					<div>
						<Button className="group relative">
							<b>$115</b>
							<span className="h-full w-[1px] bg-white/30 mx-3" />
							<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
								<ShoppingCart size={16} className="relative" strokeWidth={2} />
								<b>3</b>
							</div>
							<ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
};
