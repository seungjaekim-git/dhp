import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    SliderMainItem,
    CarouselThumbsContainer,
    SliderThumbItem,
} from "@/components/extension/carousel";

interface CarouselItem {
    id: string;
    content: JSX.Element;
}

interface CarouselProps {
    mainItems: CarouselItem[];
    thumbItems: CarouselItem[];
    orientation?: "vertical" | "horizontal";
}

const CarouselOrientation: React.FC<CarouselProps> = ({ 
    mainItems, 
    thumbItems,
    orientation = "horizontal",
    ...carouselProps 
}) => {
    if (!mainItems?.length || !thumbItems?.length) {
        return null;
    }

    return (
        <Carousel orientation={orientation} {...carouselProps}>
            <CarouselNext className="top-1/3 -translate-y-1/3 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200" />
            <CarouselPrevious className="top-1/3 -translate-y-1/3 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200" />
            <CarouselMainContainer className="h-60">
                {mainItems.map(({ id, content }) => (
                    <SliderMainItem key={id} className="bg-transparent">
                        {content}
                    </SliderMainItem>
                ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
                {thumbItems.map(({ id, content }, index) => (
                    <SliderThumbItem 
                        key={id} 
                        index={index} 
                        className="flex items-center justify-center bg-transparent hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer rounded-lg p-2 hover:bg-white/10 active:bg-white/20"
                    >
                        <div className="flex items-center justify-center">
                            {content}
                            <span className="absolute group-hover:flex transition-all duration-300 text-black font-bold">
                                {id}
                            </span>
                        </div>
                    </SliderThumbItem>
                ))}
            </CarouselThumbsContainer>
        </Carousel>
    );
};

export default CarouselOrientation;