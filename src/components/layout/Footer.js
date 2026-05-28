import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
              <div className="bg-brand w-8 h-8 rounded-lg flex items-center justify-center text-white">
                <BookOpen size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">EduFlow</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Redefining the way the world learns. Joining millions in discovering their full potential.
            </p>
          </div>
          
          {[
            { title: 'Platform', links: ['Courses', 'Instructors', 'Pricing', 'Resources'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Terms', 'Privacy', 'Cookie Policy', 'Help'] },
            { title: 'Support', links: ['FAQ', 'Center', 'Community', 'Status'] }
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-brand transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2026 EduFlow Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-xs text-gray-400 hover:text-brand transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;