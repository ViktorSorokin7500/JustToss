import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { Pagination } from "@/components/shared/pagination";
import findProduct, { GetSearchParams } from "@/lib/find-products";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const { products, totalPages } = await findProduct(searchParams);
  const currentPage = parseInt(searchParams.page || "1", 10);
  return (
    <>
      <Container className="mt-8 pb-10">
        <Title size="lg" text="Our products" className="font-extrabold pb-4" />

        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product, i) => (
                <ProductCard
                  key={i}
                  id={product.id}
                  name={product.name}
                  price={product.price.toFixed(2)}
                  imageUrl={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
                  }
                  type={product.type.name}
                  thc={product.thcLevel}
                  terpene={product.terpene?.name || ""}
                />
              ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </Container>
    </>
  );
}
