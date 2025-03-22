
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-blue-500 rounded-lg"></div> */}
            <div
              class="
                w-8 h-8
                bg-blue-400/20
                rounded-lg
                flex
                items-center
                justify-center
                text-xl
                transition-transform
                group-hover:scale-110
            "
            >
              ❔
            </div>
            <span className="text-white font-semibold">SimpleVote</span>
          </div>

          <div className="hidden md:flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Tech Stack
            </a>
          </div>

          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
