const SideBar = () => {
    return (
        <nav class="fixed top-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex justify-between items-center">
                
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg"></div>
                    <span class="text-white font-semibold">DeFiApp</span>
                </div>

                
                <div class="hidden md:flex gap-6">
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">Swap</a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors">Pool</a>
                </div>

                
                {/* <button class="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-600 transition-colors">
                    Connect Wallet
                </button> */}
                <ConnectButton />
                </div>
            </div>
        </nav>
    );
}

export default SideBar;