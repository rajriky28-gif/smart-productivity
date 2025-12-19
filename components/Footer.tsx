import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

interface FooterProps {
    onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="font-bold text-lg text-black">Smart Productivity</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Design the life you want to live. Build the work you want to see.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('stride'); }} className="hover:text-black transition">Stride</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('roadmap'); }} className="hover:text-black transition">Roadmap</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('updates'); }} className="hover:text-black transition">Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('about'); }} className="hover:text-black transition">About</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('blog'); }} className="hover:text-black transition">Blog</a></li>
              <li><a href="#" className="hover:text-black transition">Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('contact'); }} className="hover:text-black transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition">Cookie Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate?.('contact'); }} className="hover:text-black transition">Help & Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2025 Smart Productivity. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-black transition"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-black transition"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-black transition"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;