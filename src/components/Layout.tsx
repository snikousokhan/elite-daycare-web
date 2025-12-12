import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { Button } from './UI';
import { LogOut, User as UserIcon, Search, Home, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path ? 'text-elite-600 font-semibold' : 'text-gray-600 hover:text-elite-600';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
               <div className="w-8 h-8 bg-elite-600 rounded-lg mr-2 flex items-center justify-center text-white font-serif font-bold text-xl">E</div>
               <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">ELITE <span className="text-elite-600 font-sans text-sm font-medium">Daycare</span></span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex space-x-6 mr-4">
                     <Link to="/" className={isActive('/')}>Home</Link>
                     {user.role === UserRole.PARENT && <Link to="/search" className={isActive('/search')}>Find Daycare</Link>}
                     {user.role === UserRole.ADMIN && <Link to="/admin" className={isActive('/admin')}>Admin Panel</Link>}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link to={user.role === UserRole.ADMIN ? "/admin" : "/profile"}>
                      <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-elite-600">
                        <div className="w-8 h-8 rounded-full bg-elite-100 flex items-center justify-center text-elite-700">
                          <UserIcon size={18} />
                        </div>
                        <span className="hidden sm:block">{user.name}</span>
                      </div>
                    </Link>
                    <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/auth?mode=login">
                    <Button variant="outline" className="border-transparent hover:bg-gray-100 text-gray-600">Log in</Button>
                  </Link>
                  <Link to="/auth?mode=register">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">&copy; 2023 Elite Daycare Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;