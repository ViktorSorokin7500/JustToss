import React from "react";
import { cn } from "@/lib/utils";
import { FilterCheckbox, Title } from ".";
import { Input } from "../ui";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn(className)}>
			<Title text="Fliters" size="sm" className="mb-5 font-bold" />

			<div className="flex flex-col gap-4">
				<FilterCheckbox text="Top rated" value="1" />
				<FilterCheckbox text="New" value="2" />
			</div>

			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Price:</p>
				<div className="flex gap-3 mb-5">
					<Input type="number" placeholder="0" min={0} max={10} />
					<Input type="number" placeholder="10" min={1} max={10} />
				</div>
			</div>
		</div>
	);
};
