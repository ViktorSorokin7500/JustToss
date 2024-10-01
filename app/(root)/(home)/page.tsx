import { Container, Filters, Title, TopBar } from "@/components/shared";
export default async function Home() {
	return (
		<>
			<Container className="mt-8">
				<Title size="lg" text="Our products" className="font-extrabold" />
			</Container>
			<TopBar />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					<div className="w-[250px]">
						<Filters />
					</div>

					<div className="flex-1">
						<div className="flex flex-col gap-16">List</div>
					</div>
				</div>
			</Container>
		</>
	);
}
