import { FC } from 'react'

interface ThreeDCardProps {
  title?: string
  content?: string
  month?: string
  date?: string
}

export const ThreeDCard: FC<ThreeDCardProps> = ({
  title = "3D Card",
  content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  month = "JUNE", 
  date = "29"
}) => {
  return (
    <div className="w-[300px] p-5 [perspective:1000px]">
      <div className="pt-[50px] border-[3px] border-white [transform-style:preserve-3d] bg-[linear-gradient(135deg,#0000_18.75%,#f3f3f3_0_31.25%,#0000_0),repeating-linear-gradient(45deg,#f3f3f3_-6.25%_6.25%,#ffffff_0_18.75%)] bg-[length:60px_60px] bg-[position:0_0,0_0] bg-[#f0f0f0] w-full shadow-[rgba(142,142,142,0.3)_0px_30px_30px_-10px] transition-all duration-500 ease-in-out hover:bg-[position:-100px_100px,-100px_100px] hover:[transform:rotate3d(0.5,1,0,30deg)]">
        
        <div className="bg-[rgba(4,193,250,0.732)] transition-all duration-500 ease-in-out p-[60px_25px_25px_25px] [transform-style:preserve-3d]">
          <span className="inline-block text-white text-[25px] font-[900] transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,50px)] hover:[transform:translate3d(0px,0px,60px)]">
            {title}
          </span>
          
          <p className="mt-[10px] text-[12px] font-[700] text-[#f2f2f2] transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,30px)] hover:[transform:translate3d(0px,0px,60px)]">
            {content}
          </p>
          
          <button className="cursor-pointer mt-4 inline-block font-[900] text-[9px] uppercase text-[rgb(7,185,255)] bg-white px-2 py-2 transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,20px)] hover:[transform:translate3d(0px,0px,60px)]">
            Learn More
          </button>
        </div>

        <div className="absolute top-[30px] right-[30px] h-[60px] w-[60px] bg-white border border-[rgb(7,185,255)] p-[10px] [transform:translate3d(0px,0px,80px)] shadow-[rgba(100,100,111,0.2)_0px_17px_10px_-10px]">
          <span className="block text-center text-[rgb(4,193,250)] text-[9px] font-[700]">
            {month}
          </span>
          <span className="block text-center text-[20px] font-[900] text-[rgb(4,193,250)]">
            {date}
          </span>
        </div>

      </div>
    </div>
  )
}