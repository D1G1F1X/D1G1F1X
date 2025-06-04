export default function CssMoon() {
  return (
    <div className="fixed top-[10vh] left-[10vw] w-[16vmin] h-[16vmin] max-w-[200px] max-h-[200px] pointer-events-none z-10">
      {/* Moon glow */}
      <div className="absolute w-[250%] h-[250%] top-[-75%] left-[-75%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]"></div>

      {/* CSS Moon */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-inner">
        {/* Moon craters */}
        <div className="absolute w-[20%] h-[20%] top-[20%] left-[30%] rounded-full bg-gray-200/50"></div>
        <div className="absolute w-[15%] h-[15%] top-[50%] left-[60%] rounded-full bg-gray-200/50"></div>
        <div className="absolute w-[25%] h-[25%] top-[65%] left-[25%] rounded-full bg-gray-200/50"></div>
      </div>
    </div>
  )
}
