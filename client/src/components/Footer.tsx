import { Instagram, Linkedin, Github, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030713] text-white pt-12 pb-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">WeCall</h3>
            <p className="mb-4 text-gray-100">
              Connecting people through seamless communication. Our platform provides high-quality
              voice and video calls with enhanced security.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/suhaskanwar.bh3/" className="hover:text-blue-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/suhas-kanwar-4a3a09291" className="hover:text-blue-300 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/SuhasKanwar" className="hover:text-blue-300 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1" size={18} />
                <span>Gurugram, Haryana 122017</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3" size={18} />
                <span>9650164357</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3" size={18} />
                <span>suhas.kanwar@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4 text-gray-100">Subscribe to our newsletter for the latest updates and features.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded text-gray-900 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-white text-indigo-600 px-4 py-2 rounded font-medium hover:bg-blue-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} WeCall. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with ❤️ for better communication</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;