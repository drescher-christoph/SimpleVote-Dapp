const ActionButton = ({action, label}) => {
    return (
        <button onClick={action} class="
      px-8 py-4
      my-4
      bg-gray-900
      text-white
      font-semibold
      rounded-2xl
      relative
      overflow-hidden
      group
      transition-all
      duration-500
      before:absolute
      before:inset-0
      before:bg-gradient-to-r
      before:from-blue-500
      before:to-purple-600
      before:opacity-0
      before:transition-opacity
      before:duration-500
      hover:before:opacity-100
    ">
      <span class="relative z-10 flex items-center gap-2">
        <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        {label}
      </span>
      <div class="
        absolute
        inset-[2px]
        bg-gray-900
        rounded-xl
        z-0
      "></div>
    </button>
    );
}

export default ActionButton;