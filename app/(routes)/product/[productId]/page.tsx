import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import InfoModal from "@/components/info-modal"; // ✅ Import the modal version

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const suggestedProducts = await getProducts({
    categoryId: product.category?.id,
    excludeId: product.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          {/* Product details */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mt-10">
            <Gallery images={product.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-8">
            <InfoModal data={product} />

              {/* ✅ Added InfoModal here */}
              <div className="block lg:hidden border-t pt-6">
               
              </div>
            </div>
          </div>

          <hr className="my-10" />

          <ProductList title="Related Items" items={suggestedProducts} />
          {suggestedProducts.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              No related items found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
