import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  className = '', 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const baseStyle = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  const variants = {
    primary: "bg-elite-600 text-white hover:bg-elite-700 focus:ring-elite-500 shadow-md shadow-elite-200",
    secondary: "bg-gold-500 text-white hover:bg-gold-600 focus:ring-gold-500 shadow-md shadow-orange-100",
    outline: "border-2 border-elite-600 text-elite-600 hover:bg-elite-50 focus:ring-elite-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
  };
  return <button className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${className}`} {...props} />;
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...props }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${className}`} {...props} />
);

export const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = "bg-elite-100 text-elite-800" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string, wrapperClassName?: string }> = ({ label, className = '', wrapperClassName = 'mb-4', ...props }) => (
  <div className={wrapperClassName}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-elite-500 focus:border-elite-500 transition-colors ${className}`} {...props} />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string, wrapperClassName?: string }> = ({ label, className = '', wrapperClassName = 'mb-4', children, ...props }) => (
  <div className={wrapperClassName}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-elite-500 bg-white ${className}`} {...props}>
      {children}
    </select>
  </div>
);

export const Spinner: React.FC = () => (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elite-600"></div>
  </div>
);

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm p-4 md:inset-0 h-modal md:h-full">
      <div className="relative w-full max-w-lg md:h-auto">
        <div className="relative bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-start p-4 rounded-t border-b">
            <h3 className="text-xl font-serif font-bold text-gray-900">
              {title}
            </h3>
            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MultiSelect: React.FC<{
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}> = ({ label, options, selected, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[160px] px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-elite-500 whitespace-nowrap transition-all hover:border-elite-300"
      >
        <span className="truncate block max-w-[140px] text-left text-gray-700">
          {selected.length === 0 ? label : `${selected.length} selected`}
        </span>
        <ChevronDown size={16} className={`ml-2 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto p-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map(option => (
            <div 
              key={option} 
              onClick={() => toggleOption(option)}
              className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors select-none"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center mr-2 transition-colors ${selected.includes(option) ? 'bg-elite-600 border-elite-600' : 'border-gray-300'}`}>
                {selected.includes(option) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
              </div>
              <span className={`text-sm ${selected.includes(option) ? 'text-elite-700 font-medium' : 'text-gray-700'}`}>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};