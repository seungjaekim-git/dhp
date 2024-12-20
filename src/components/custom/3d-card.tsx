import { FC, ReactNode } from 'react'

interface ThreeDCardProps {
  title?: string | ReactNode
  content?: string | ReactNode
  topRightContent?: {
    top?: string | ReactNode
    bottom?: string | ReactNode
  }
  className?: string
  button?: {
    text?: string | ReactNode
    link?: string
  }
  style?: {
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    borderColor?: string
  }
  children?: ReactNode
}

export const ThreeDCard: FC<ThreeDCardProps> = ({
  title,
  content,
  topRightContent,
  className = "",
  button = {
    text: "자세히 보기",
    link: "#"
  },
  style = {
    backgroundColor: "rgba(4,193,250,0.732)",
    textColor: "white", 
    accentColor: "rgb(7,185,255)",
    borderColor: "white"
  },
  children
}) => {
  return (
    <div className={`w-full p-5 [perspective:1000px] ${className}`}>
      <div className="pt-[50px] border-[3px] border-white [transform-style:preserve-3d] bg-[linear-gradient(135deg,#0000_18.75%,#f3f3f3_0_31.25%,#0000_0),repeating-linear-gradient(45deg,#f3f3f3_-6.25%_6.25%,#ffffff_0_18.75%)] bg-[length:60px_60px] bg-[position:0_0,0_0] bg-[#f0f0f0] w-full shadow-[rgba(142,142,142,0.3)_0px_30px_30px_-10px] transition-all duration-500 ease-in-out hover:bg-[position:-100px_100px,-100px_100px] hover:[transform:rotate3d(0.5,1,0,30deg)]">
        
        <div 
          className="transition-all duration-500 ease-in-out p-[60px_25px_25px_25px] [transform-style:preserve-3d]"
          style={{ backgroundColor: style.backgroundColor }}
        >
          {title && (
            <div 
              className="inline-block text-[25px] font-[900] transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,50px)] hover:[transform:translate3d(0px,0px,60px)]"
              style={{ color: style.textColor }}
            >
              {title}
            </div>
          )}
          
          {content && (
            <div 
              className="mt-[10px] text-[12px] font-[700] transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,30px)] hover:[transform:translate3d(0px,0px,60px)]"
              style={{ color: style.textColor }}
            >
              {content}
            </div>
          )}

          {children && (
            <div className="mt-4 [transform:translate3d(0px,0px,40px)] hover:[transform:translate3d(0px,0px,60px)]">
              {children}
            </div>
          )}
          
          {button && button.text && (
            <a 
              href={button.link}
              className="cursor-pointer mt-4 inline-block font-[900] text-[9px] uppercase bg-white px-2 py-2 transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,20px)] hover:[transform:translate3d(0px,0px,60px)]"
              style={{ color: style.accentColor }}
            >
              {button.text}
            </a>
          )}
        </div>

        {topRightContent && (
          <div 
            className="absolute top-[30px] right-[30px] h-[60px] w-[60px] bg-white p-[10px] [transform:translate3d(0px,0px,80px)] shadow-[rgba(100,100,111,0.2)_0px_17px_10px_-10px]"
            style={{ borderColor: style.borderColor }}
          >
            {topRightContent.top && (
              <div 
                className="block text-center text-[9px] font-[700]"
                style={{ color: style.accentColor }}
              >
                {topRightContent.top}
              </div>
            )}
            {topRightContent.bottom && (
              <div
                className="block text-center text-[20px] font-[900]"
                style={{ color: style.accentColor }}
              >
                {topRightContent.bottom}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}