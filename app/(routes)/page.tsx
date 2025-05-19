import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import Link from "next/link";
import FeaturedProducts from "@/components/ui/featured-products";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("f6c17d4c-3f42-4ae4-839a-84dbc61bff02");
  const categories = await getCategories();

  const newCategory = categories.find((category) => category.name === "New");

  const categoryImages = [

   
    "/images/categories/FOTO-6.png",
    "/images/categories/FOTO-5.png",
    "/images/categories/women1.png",

    "/images/categories/acc1.png",
    "/images/categories/access.avif",
    "/images/categories/ankh1.jpg",
  ];

  return (
    <Container>
      {/* Billboard */}
      <div className="pb-24">
        <Billboard
          data={billboard}
          className="h-screen max-h-[80vh] w-full object-cover brightness-90"
        />
      </div>

      {/* Discover Categories Header */}
      <div className="px-6 sm:px-8 lg:px-12 mb-8">
        <div className="pt-8 mb-12">
          <h3 className="text-2xl font-extralight tracking-[0.2em] uppercase text-neutral-1200 border-b border-neutral-300 pb-3">
            Discover Categories
          </h3>
        </div>
      </div>

      {/* Ангилалын зургуудыг харуулах хэсэг - дэлгэцийн бүтэн өргөнтэй */}
      <div className="mb-24 mx-[-webkit-calc((100vw-100%)/-2)] mx-[calc((100vw-100%)/-2)]">
        {/*  босоо зурагтай 2 ангилал */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {categories.slice(0, 4).map((category, index) => (
            <div
              key={category.id}
              className="relative group h-[520px] overflow-hidden bg-neutral-200"
            >
              {/* Ангиллын зураг */}
              <img
                src={categoryImages[index]}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
              />
              {/* Ангиллын нэр болон товч */}
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <div className="bg-transparent border-l-2 border-white pl-4">
                  <h2 className="text-white text-3xl font-extralight tracking-[0.2em] uppercase mb-4">
                    {category.name}
                  </h2>
                  <Link href={`/category/${category.id}`}>
                    <button className="text-white text-sm font-light tracking-[0.15em] uppercase border-b border-white pb-1 hover:border-b-2 transition duration-300 cursor-pointer">
                      Discover
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* стилийн 2 хэвтээ баннер – улирлын кампанит ажлууд */}
        <div className="flex flex-col gap-0 mt-0">
          {categories.slice(4, 6).map((category, index) => (
            <div
              key={category.id}
              className="relative group h-[350px] w-full overflow-hidden bg-neutral-100 group-hover:scale-105"
            >
              {/* Хэвтээ зураг */}
              <img
                src={categoryImages[index + 4]}
                alt={category.name}
                className="w-full h-220 object-cover transition-all duration-500 group-hover:brightness-90 group-hover:scale-105"
              />
              {/* Гарчиг ба товч */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-white text-4xl font-extrabold tracking-[0.2em] uppercase mb-4">
                  {category.name}
                </h2>
                <Link href={`/category/${category.id}`}>
                <button className="px-8 py-3 rounded-full border border-white text-white text-1xl font-extralight tracking-[0.2em] uppercase mb-4bg-white/10 backdrop-blur-md transition duration-300 hover:bg-white hover:text-black cursor-pointer">
  Discover
</button>


                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <FeaturedProducts products={products} />

      {/* NEW ARRIVAL Section */}
      <div className="mb-24">
        {/* NEW ARRIVAL Header */}
        <div className="px-6 sm:px-8 lg:px-12 pt-8 mb-12">
          <h2 className="text-3xl font-extralight tracking-[0.1em] uppercase text-neutral-800 border-b border-neutral-300 pb-3">
            NEW ARRIVAL
          </h2>
        </div>

      
        <div className="relative h-[350px] w-screen overflow-hidden bg-neutral-100 group left-1/2 -translate-x-1/2">
          {/* Full-width image */}
          <img
            src="/images/categories/highlights.avif"
            alt="New Collection / 2025 Summer"
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-90 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">

            <h2 className="text-white text-4xl font-extrabold tracking-[0.2em] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              NEW COLLECTION / 2025 SUMMER
            </h2>
            {newCategory && (
              <Link href={`/category/${newCategory.id}`}>
                <button className="text-black text-sm font-bold tracking-[0.15em] uppercase bg-white px-6 py-2 hover:bg-gray-200 transition duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)] z-10">
                  DISCOVER
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
    
  );
};

export default HomePage;