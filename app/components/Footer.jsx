import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <footer className="text-black py-10 px-6 max-w-full">
                
                {/* Divider Line */}
                <div className="w-full border-t border-gray-300 mb-6"></div>

                <div className="max-w-4xl mx-auto text-center space-y-4">

                    {/* Company Name + Rights */}
                    <p className="text-sm font-medium">
                        © 2025 Aethel Flow Solutions Pvt. Ltd. All Rights Reserved.
                    </p>

                    {/* Address */}
                    <p className="text-sm opacity-80">
                        9-4-136/19,20 & 21/A, Shareef Residency 3rd floor, 7 tombs Road,<br></br>
                        TOLICHOWKI,HYDRABAD,TELANGANA
                        
                    </p>

                    {/* Contact Info */}
                    <div className="text-sm opacity-80 space-y-1">
                        <p>Email: contact@aethelflow.com</p>
                        <p>Phone: +91 9022511316<br></br>
                            +91 8328901076
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-8 pt-2 text-2xl">
                        <a href="#" className="hover:#2563EB transition">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="hover:#2563EB transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:#2563EB transition">
                            <FaFacebook />
                        </a>
                    </div>

                </div>
            </footer>
        </div>
    );
}
