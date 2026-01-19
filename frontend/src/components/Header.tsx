

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm md:shadow-none w-full py-4 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* LEFT: Toggle Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
               strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block w-[300px] lg:w-[400px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F5F6FA] border border-transparent focus:bg-white focus:border-blue-200 outline-none text-sm transition-all"
          />
          <img src="/search.png" className="w-4 absolute left-4 top-3 opacity-50" alt="Search" />
        </div>
      </div>

      {/* RIGHT: Actions & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="md:hidden p-2 text-gray-500">
          <img src="/search.png" className="w-5 h-5 opacity-70" alt="Search" />
        </button>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <img src="/Icon.png" className="w-6 h-6" alt="Notification" />   {/* <-- FIXED */}
          <span className="absolute -top-1 -right-1 bg-[#ea2e2e] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
            6
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/MONI.png"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-gray-200"
            alt="User"
          />
          <div className="hidden sm:block text-sm">
            <div className="font-bold text-[#404040]">Moni Roy</div>
            <div className="text-gray-400 text-xs">Admin</div>
          </div>
          <img
            src="/down.png"
            className="w-3 h-3 opacity-60 ml-1 hidden sm:block"
            alt="Dropdown"
          />
        </div>
      </div>
    </header>
  );
}
