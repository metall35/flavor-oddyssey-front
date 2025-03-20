import CategoryButton from "../Buttons/CategoryButton"



const ContentCategory = ({ data, style, className }) => {

    return (
        <div className={`items-start justify-items-center gap-3 ${className}`}>
            {data?.map(category => (
                <CategoryButton classes={style} key={category.id} image={category.image} text={category.name} />
            ))}
        </div>
    )
}

export default ContentCategory