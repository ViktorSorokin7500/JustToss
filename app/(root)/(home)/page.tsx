import { Container, Filters, ProductCard, Title } from "@/components/shared";
import data from "@/lib/leafly_strain_data.json";

export default async function Home() {
  return (
    <>
      <Container className="mt-8 pb-10">
        <Title size="lg" text="Our products" className="font-extrabold pb-4" />

        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <div className="grid grid-cols-3 gap-12">
                {data.map((product, i) => (
                  <ProductCard
                    key={i}
                    id={product.id}
                    name={product.name}
                    price={product.price.toFixed(2)}
                    imageUrl={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
                    }
                    type={product.type}
                    thc={product.thc_level}
                    terpene={product.most_common_terpene}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
