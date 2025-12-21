import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const MotionNav = motion.nav as any;
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

interface NavbarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 20;
    if (isScrolled !== scrolled) {
      setIsScrolled(scrolled);
    }
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (onNavigate) {
      if (item === 'Products') {
        onNavigate('products');
      } else if (item === 'About') {
        onNavigate('about');
      } else if (item === 'Contact') {
        onNavigate('contact');
      } else {
        onNavigate('home');
        setTimeout(() => {
          const sectionId = item === 'Home' ? 'root' : item.toLowerCase();
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  // Determine dark background context for initial state
  const isDarkBg = ((currentView === 'about' || currentView === 'stride' || currentView === 'home'));
  
  // Colors
  const textColor = isScrolled ? 'text-black' : (isDarkBg ? 'text-white' : 'text-black');
  const logoColor = isScrolled ? 'text-black' : (isDarkBg ? 'text-white' : 'text-black');
  const buttonBg = isScrolled ? 'bg-black text-white' : (isDarkBg ? 'bg-white text-black' : 'bg-black text-white');

  // Shared spring config for consistent feel
  const springConfig = { 
    type: "spring", 
    stiffness: 150, 
    damping: 22, 
    mass: 0.8 
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <MotionNav 
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: { 
            y: 0, 
            width: "100%", 
            maxWidth: "100%", 
            borderRadius: "0px", 
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid rgba(255,255,255,0)",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            boxShadow: "0 0 0 0 rgba(0,0,0,0)"
          },
          scrolled: { 
            y: 12, 
            width: "92%", // Using % avoids layout thrashing of 'auto'
            maxWidth: "640px", 
            borderRadius: "9999px", 
            backgroundColor: "rgba(255,255,255,0.9)", 
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)"
          }
        }}
        transition={springConfig}
        className="pointer-events-auto flex items-center justify-between"
      >
        {/* Logo Section */}
        <div 
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={(e) => {
                if (onNavigate) { 
                    onNavigate('home'); 
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }}
        >
          <MotionDiv 
            animate={{ 
                scale: isScrolled ? 1.2 : 1, 
            }}
            transition={springConfig}
            className={`w-14 h-14 flex items-center justify-center transition-colors duration-300 ${logoColor}`}
          >
             <svg viewBox="0 0 1024 1024" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M619.484009,472.942200 C634.275513,481.770813 641.267822,496.167694 637.121582,510.903473 C632.213806,506.010773 627.669922,501.608734 623.274475,497.063141 C618.891846,492.530792 616.042847,486.672180 610.247620,482.110870 C614.715149,496.631775 612.475525,508.867249 599.977966,518.559021 C598.883484,505.838043 597.789001,493.117065 596.594910,479.238037 C589.166260,488.447571 583.884399,497.430725 579.284363,506.824860 C571.940308,521.822571 565.827820,537.229614 562.794617,553.790222 C561.928528,558.518921 563.288513,560.219543 567.592651,561.651184 C588.412048,568.576172 607.699524,578.735840 626.233704,590.364319 C630.024109,592.742432 634.502625,595.217590 634.104065,600.448059 C633.695923,605.803589 628.908081,607.886780 624.677185,609.835754 C612.895508,615.263306 600.248535,617.523193 587.531311,619.195923 C558.902954,622.961426 530.111084,623.955933 501.285461,622.950928 C476.167938,622.075256 451.070282,620.579956 426.541870,614.369202 C421.365387,613.058533 416.284210,611.442444 411.517944,609.016296 C400.908722,603.616211 400.473022,596.436462 410.732849,590.245239 C422.851105,582.932434 435.221497,576.016724 448.075531,570.049438 C453.053619,567.738464 458.165222,565.669128 463.343140,563.852173 C466.376556,562.787781 467.249451,561.018921 466.507141,558.170044 C462.055817,541.086914 455.160339,525.125671 444.655914,510.836639 C444.493713,510.616028 444.102020,510.564117 443.362518,510.224670 C441.329803,516.910461 443.163696,524.129700 440.105621,531.490051 C434.444702,525.926453 431.587463,520.162598 433.965271,511.057037 C428.067993,516.652954 424.524536,522.530212 418.262909,527.030884 C416.366730,516.669006 420.334625,509.723877 428.294617,503.714111 C421.933838,503.120117 416.295288,502.593567 410.656738,502.067047 C410.617096,501.490051 410.577454,500.913055 410.537811,500.336060 C417.685394,493.636902 426.065033,491.881592 436.176880,495.783447 C436.924530,485.361176 440.081421,477.038483 451.714478,473.264252 C449.789612,479.703400 448.198059,485.027588 446.301453,491.372162 C454.892609,486.262421 463.083771,484.550690 472.897583,490.023010 C466.012482,493.461487 459.827271,495.755585 452.565033,498.306580 C460.801300,500.232513 465.764282,504.469238 469.031311,511.962433 C460.965424,512.019043 454.750336,508.429535 447.203705,506.781464 C450.441620,510.996399 453.186066,514.484680 455.840607,518.040039 C464.272278,529.333069 470.824371,541.658630 475.635742,554.883911 C476.850128,558.221924 478.484406,559.055359 482.006165,558.220886 C493.938324,555.393616 492.507507,556.707458 489.671600,545.890137 C482.582703,518.849915 474.291138,492.130524 468.273560,464.801849 C465.519684,452.295227 464.416412,439.560394 462.521301,425.549988 C454.415924,442.488403 445.321777,457.409973 436.624207,472.821289 C426.498413,462.418762 429.672577,441.648315 444.299774,422.135651 C427.247223,428.161194 412.554077,437.577362 395.583374,440.950928 C393.503601,424.762756 416.023346,407.277313 442.614349,404.505585 C428.866394,397.732697 415.602417,391.198212 402.338440,384.663727 C402.406128,384.131683 402.473816,383.599640 402.541504,383.067566 412.559540,378.680817 422.963501,376.475189 434.026245,379.126129 C445.102112,381.780121 453.666992,388.482330 461.357147,397.315430 C466.163330,384.098694 472.930023,373.080627 486.182190,367.730042 C494.524048,364.362061 503.108551,362.222961 513.839600,363.141937 C507.552979,369.381409 502.169128,374.579193 496.954193,379.941254 C491.627808,385.417938 485.981262,390.607483 480.542694,397.676636 C504.902527,390.587067 524.858948,394.811707 539.993530,417.050476 C520.973877,417.064423 503.152649,415.878693 484.858521,412.767273 C485.830353,415.669067 487.381653,416.038361 488.654114,416.604797 502.319611,422.688202 508.705536,433.983978 511.255341,448.036530 511.641144,450.162842 511.965302,452.308044 512.157776,454.458832 512.270935,455.722626 512.658752,457.266418 511.143219,458.022247 509.679443,458.752350 508.626587,457.659882 507.591980,456.845215 497.639557,449.008423 488.010681,440.792389 478.694458,432.207977 475.943085,429.672729 473.121277,427.213928 469.889465,425.058075 470.133911,432.495056 472.348206,439.251953 474.001678,446.116272 481.549683,477.451050 493.380463,507.332764 504.960083,537.301636 506.698486,541.800720 508.126434,546.420105 509.685059,550.988220 510.283173,552.741333 511.261322,553.905457 513.334778,553.578918 M553.627747,481.595245 C558.585388,483.001740 557.365356,478.365631 559.578552,477.087616 C559.280945,476.747772 558.983398,476.407898 558.685791,476.068054 C555.932739,477.162689 553.179688,478.257324 549.736633,479.626312 C551.376526,480.488678 552.223389,480.934021 553.627747,481.595245 z" />
            </svg>
          </MotionDiv>
          <MotionSpan 
            animate={{ 
                width: isScrolled ? 0 : "auto", 
                opacity: isScrolled ? 0 : 1,
                marginLeft: isScrolled ? 0 : 8
            }}
            transition={{ ...springConfig, stiffness: 200 }} // Slightly faster text collapse
            className={`hidden md:block font-bold text-lg tracking-tight overflow-hidden whitespace-nowrap transition-colors duration-300 ${textColor}`}
          >
            Smart Productivity
          </MotionSpan>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 mx-4">
          {['Home', 'Products', 'About'].map((item) => {
             const isActive = (currentView === 'products' && item === 'Products') || 
                              (currentView === 'home' && item === 'Home') || 
                              (currentView === 'about' && item === 'About') ||
                              (currentView === 'contact' && item === 'Contact');
             
             return (
             <a 
               key={item}
               href={`#${item.toLowerCase()}`}
               onClick={(e) => handleLinkClick(e, item)}
               className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap
                  ${isScrolled ? 'text-gray-600 hover:text-black hover:bg-gray-100' : (isDarkBg ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-black/5')}
                  ${isActive ? 'font-bold' : ''}
               `}
             >
               {item}
             </a>
             );
          })}
            <a 
               href="#contact"
               onClick={(e) => handleLinkClick(e, 'Contact')}
               className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all whitespace-nowrap
                  ${isScrolled ? 'text-gray-600 hover:text-black hover:bg-gray-100' : (isDarkBg ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-black/5')}
                  ${currentView === 'contact' ? 'font-bold' : ''}
               `}
             >
               Contact
             </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block pl-2 shrink-0">
            <button className={`${buttonBg} px-4 py-1.5 rounded-full text-sm font-bold transition hover:scale-105 active:scale-95 duration-200 shadow-sm`}>
                Get Started
            </button>
        </div>

        {/* Mobile Toggle */}
        <button 
            className={`md:hidden p-2 rounded-full transition-colors shrink-0 ${textColor} ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <MotionDiv 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl border border-gray-100 shadow-2xl md:hidden overflow-hidden p-2 mx-4"
            >
              <div className="flex flex-col">
                {['Home', 'Products', 'About'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="p-3 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a 
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, 'Contact')}
                    className="p-3 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                    Contact
                </a>
                <div className="p-2 pt-4">
                    <button className="bg-black text-white w-full py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-transform text-sm">
                        Get Started
                    </button>
                </div>
              </div>
            </MotionDiv>
          ) : null}
        </AnimatePresence>
      </MotionNav>
    </div>
  );
};

export default Navbar;