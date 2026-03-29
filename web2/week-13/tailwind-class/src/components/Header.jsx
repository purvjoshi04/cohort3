import television from "../assets/television.png"

export const Header = () => {
    return (
        <div className="flex items-center justify-center gap-2 pt-12">
            <img 
                src={television} 
                alt="Webinar Logo" 
                width={40} 
                height={50} 
                className="object-contain" 
            />
            <div className="flex items-baseline pt-1 text-xl">
                <div className="text-[#68d5d7]">
                    Webinar
                </div>
                <div className="text-white">.gg</div>
            </div>
        </div>
    )
}