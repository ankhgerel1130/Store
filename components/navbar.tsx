import Container from "./ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import SearchModal from "./search-modal"; 

const Navbar = async () => {
  const categories = await getCategories();
  
  return (
    <div className="fixed w-full z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"></div>
      
      <Container>
  <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-center">
    <div className="flex items-center gap-x-6 z-10">
      <Link href="/" className="flex gap-x-2">
        <p className="font-engry font-extrabold text-xl tracking-wider text-white uppercase">
          MY STORE
        </p>
      </Link>

      <MainNav 
        data={categories} 
        className="z-10"
      />
    </div>

    <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center gap-4 z-10">
      <NavbarActions />
    </div>
  </div>
</Container>


      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </div>
  );
};

export default Navbar;