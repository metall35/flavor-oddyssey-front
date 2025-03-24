import Link from "next/link";

const NavDesktop = ({ items }) => {

    return (
        <ul className="sm:flex gap-4 lg:text-lg md:text-md items-center font-medium hidden">
            {items.map((item, index) => (
                <li key={index}>
                    {typeof item.name === "string" ? (
                        <Link href={item.href} className="hover:text-flavor-2">{item.name}</Link>
                    ) : (
                        item.name // Renderiza el componente directamente si no es un string
                    )}
                </li>
            ))}
        </ul>
    )
}

export default NavDesktop;
