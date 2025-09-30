import logo from "../assets/cec.jpg"; 
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        
        {/* Logo and Name stacked vertically */}
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="CEC Logo" className="w-36 h-36 rounded-full shadow-md" />
          <h2 className="text-xl font-bold text-center ">CEBU EASTERN COLLEGE</h2>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="flex items-center justify-center md:justify-end gap-2">
            <Mail className="w-4 h-4" /> cebueasterncollege1915@yahoo.com
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2">
            <Phone className="w-4 h-4" /> +63 912 345 6789
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2">
            <MapPin className="w-4 h-4" /> Leon Kilat St., Cebu City, Philippines, 6000
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm text-white/80">
        © 2025 Cebu Eastern College. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
