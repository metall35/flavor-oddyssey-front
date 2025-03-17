


const search = ({ query }) => {
    return (
        <div>
            <h1>{query}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { q } = context.query;



    return {
        props: {
            query: q || "",
        },
    };
}


export default search