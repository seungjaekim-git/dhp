import * as React from "react"

export default function Test() {
  return (
    <div>
      <div className="w-[190px] h-[254px] rounded-[20px] bg-[#f5f5f5] relative p-7 border-2 border-[#c3c6ce] transition-all duration-500 overflow-visible hover:border-[#008bf8] hover:shadow-lg">
        <div className="h-full gap-2 grid place-content-center text-black">
          <p className="text-2xl font-bold">Card title</p>
          <p className="text-gray-500">Here are the details of the card</p>
        </div>
        <button className="w-[60%] rounded-2xl border-none bg-[#008bf8] text-white text-base py-2 px-4 left-1/2 bottom-0 -translate-x-1/2 translate-y-[125%] opacity-0 transition-all duration-300 ease-out hover:translate-y-1/2 hover:opacity-100">
          More info
        </button>
      </div>
    </div>
  )
}
