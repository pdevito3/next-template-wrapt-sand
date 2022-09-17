import {
  PaginatedTable,
  TrashButton,
  usePaginatedTableContext,
} from "@/components/forms";
import useDeleteModal from "@/components/modal/ConfirmDeleteModal";
import { Notifications } from "@/components/notifications";
import { RecipeDto, useDeleteRecipe, useRecipes } from "@/domain/recipes";
import "@tanstack/react-table";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { useRouter } from "next/router";

interface RecipeListTableProps {
  queryFilter?: string | undefined;
}

export function RecipeListTable({ queryFilter }: RecipeListTableProps) {
  const router = useRouter();
  const { sorting, pageSize, pageNumber } = usePaginatedTableContext();

  const openDeleteModal = useDeleteModal();
  const deleteRecipeApi = useDeleteRecipe();
  function deleteRecipe(id: string) {
    deleteRecipeApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("Recipe deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the recipe");
        console.error(e);
      });
  }

  const { data: recipeResponse, isLoading } = useRecipes({
    sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const recipeData = recipeResponse?.data;
  const recipePagination = recipeResponse?.pagination;

  const columnHelper = createColumnHelper<RecipeDto>();
  const columns = [
    columnHelper.accessor((row) => row.title, {
      id: "title",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Title</span>,
    }),
    columnHelper.accessor((row) => row.visibility, {
      id: "visibility",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Visibility</span>,
    }),
    columnHelper.accessor((row) => row.directions, {
      id: "directions",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Directions</span>,
    }),
    columnHelper.accessor((row) => row.rating, {
      id: "rating",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Rating</span>,
    }),
    columnHelper.accessor((row) => row.dateOfOrigin, {
      id: "dateOfOrigin",
      cell: (info) => <p className="">{info.getValue()?.toLocaleString()}</p>,
      header: () => <span className="">Date Of Origin</span>,
    }),
    columnHelper.accessor("id", {
      enableSorting: false,
      meta: { thClassName: "w-10" },
      cell: (row) => (
        <div className="flex items-center justify-center w-full">
          <TrashButton
            onClick={(e) => {
              openDeleteModal({
                onConfirm: () => deleteRecipe(row.getValue()),
              });
              e.stopPropagation();
            }}
          />
        </div>
      ),
      header: () => <span className=""></span>,
    }),
  ];

  return (
    <PaginatedTable
      data={recipeData}
      columns={columns}
      apiPagination={recipePagination}
      entityPlural="Recipes"
      isLoading={isLoading}
      onRowClick={(row) => router.push(`/recipes/${row.id}`)}
    />
  );
}
