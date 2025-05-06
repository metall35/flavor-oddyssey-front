import { DELETE_RECIPE } from '@/graphql/mutations/DELETE-RECIPE';
import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { useUser } from './useUser';
import { useRouter } from 'next/router';
import { useRecipeStore } from '@/context/useRecipeStore';
import { SINGLE_RECIPE_QUERY } from '@/graphql/SINGLE-RECIPE-QUERY';
import Cookies from "js-cookie";

const cookieTokenName = process.env.COOKIETOKEN; // Obtiene el nombre del token desde el .env

const useUserRecipe = () => {
    const { refetch } = useUser()
    const setUpdateRecipe = useRecipeStore((state) => state.updateRecipe)

    const { refetch: refetchRecipe, loading } = useQuery(SINGLE_RECIPE_QUERY, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            console.log(data);
            setUpdateRecipe({
                title: data.getReceta.recipe.name,
                description: data.getReceta.recipe.description,
                time: data.getReceta.recipe.time,
                difficulty: data.getReceta.recipe.difficulty,
                category: data.getReceta.recipe.category.id,
                ingredients: data.getReceta.recipe.ingredientes.map(ingredient => ({ ingredienteId: ingredient.ingrediente.id, name: ingredient.ingrediente.name, cantidad: ingredient.cantidad, medida: ingredient.medida })),
                steps: data.getReceta.recipe.pasosLista,
                photo: data.getReceta.recipe.image,
                id: data.getReceta.recipe.id,
                edit: true
            }),
            
            router.push("/crear-receta")
        },
    })

    const router = useRouter()

    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        onError: (error) => {
            toast.error("Error al eliminar la receta.", {
                duration: 5000
            })
        },
        onCompleted: () => {
            toast.success("Receta eliminada con éxito.", {
                duration: 5000
            })
            refetch()
        },
        context: {
            headers: {
                authorization: `JWT ${Cookies.get(cookieTokenName)}`, // Usa el token desde las cookies
            },
        },
    })

    const handleView = ({ recipeId, recipeName }) => {
        router.push({
            pathname: `/receta/${encodeURIComponent(recipeName)}`,
            query: { id: recipeId }
        }, undefined, { shallow: false });
    };

    const handleEdit = async ({ idRecipe }) => {
        try {
            await refetchRecipe({
                id: idRecipe,
            });
        } catch (error) {
            toast.error("Error al obtener la receta.");
        }
    }

    const handleDelete = (recipeId) => {
        toast((t) => (
            <div className="p-4">
                <p className="text-gray-800">¿Estás seguro de que deseas eliminar esta receta?</p>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={async () => {
                            try {
                                await deleteRecipe({
                                    variables: {
                                        id: recipeId
                                    }
                                });
                                toast.dismiss(t.id);
                            } catch (error) {
                                toast.error("Error al eliminar la receta.");
                            }
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
        });
    };

    return {
        handleDelete,
        handleView,
        handleEdit,
        loading
    }
}

export default useUserRecipe