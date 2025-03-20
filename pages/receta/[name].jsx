
const RecipePage = ({ id, name }) => {
    return (
        <div>
            <h1>id: {id}</h1>
            <h1>name: {name}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id, name } = context.query;



    return {
        props: {
            name: name || "",
            id: id || "",
        },
    };
}


export default RecipePage