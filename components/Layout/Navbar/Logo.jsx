import Image from "next/image";

const Logo = () => (
    <figure className="flex gap-2 items-center p-1">
        <Image
            src="/logo-flavor.svg"
            alt="recipe"
            width={60}
            height={60}
            priority
            placeholder="blur"
            blurDataURL="/logo-flavor.svg"
            className="h-auto aspect-square object-cover"
        />
        <span className="font-medium lg:text-4xl md:text-2xl sm:block hidden">flavor odyssey</span>
    </figure>
);

export default Logo;
