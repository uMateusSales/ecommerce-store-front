import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import ProductInfo from "@/components/product-info";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const sugestProducts = await getProducts({ categoryId: product.category.id });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py10 sm:px6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Produtos sugeridos" items={sugestProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
