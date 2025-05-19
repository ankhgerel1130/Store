import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Company */}
          <div>
            <h2 className="text-xl font-bold mb-6">COMPANY</h2>
            <h3 className="font-semibold mb-4 text-right md:text-left">LOCATION: REST OF THE WORLD/ENGLISH</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline"></a></li>
              <li><a href="#" className="hover:underline"></a></li>
              <li><a href="#" className="hover:underline">Luna Rossa</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Work with us</a></li>
            </ul>
          </div>

          {/* Middle Column - Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6">LEGAL NOTICE</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              <li><a href="#" className="hover:underline">Cookie setting</a></li>
              <li><a href="#" className="hover:underline">Sitemap</a></li>
            </ul>
          </div>

          {/* Right Column - Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">NEWSLETTER</h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 w-full text-white border-b border-white text-sm focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-white rounded-full text-black px-4 py-2 hover:bg-blue-200 transition-colors"
              >
                <FaPaperPlane />
              </button>
            </form>
            <p className="text-xs mt-2 text-gray-400">
              By subscribing you agree to our Privacy Policy
            </p>
            
            {/* Social Icons */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3">FOLLOW US</h4>
              <div className="flex space-x-6 text-xl">
                <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
                <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
                <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
                <a href="#" className="hover:text-gray-400"><FaPinterestP /></a>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-xs text-center sm:text-left">©ANKHGEREL 2025 - 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;