import {
  PaginatedTable,
  TrashButton,
  usePaginatedTableContext,
} from "@/components/forms";
import useDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { UserDto } from "@/domain/users/types";
import "@tanstack/react-table";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDeleteUser, useUsers } from "../api";

interface UserListTableProps {
  queryFilter?: string | undefined;
}

export function UserListTable({ queryFilter }: UserListTableProps) {
  const router = useRouter();
  const { sorting, pageSize, pageNumber } = usePaginatedTableContext();

  const openDeleteModal = useDeleteModal();
  const deleteUserApi = useDeleteUser();
  function deleteUser(id: string) {
    deleteUserApi
      .mutateAsync(id)
      .then(() => {
        // TODO are you sure modal *****************************************
        toast.success("User deleted successfully");
      })
      .catch((e) => {
        toast.error("There was an error deleting the User");
        console.error(e);
      });
  }

  const { data: UserResponse, isLoading } = useUsers({
    sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const UserData = UserResponse?.data;
  const UserPagination = UserResponse?.pagination;

  const columnHelper = createColumnHelper<UserDto>();
  const columns = [
    columnHelper.accessor((row) => row.identifier, {
      id: "identifier",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Identifier</span>,
    }),
    columnHelper.accessor((row) => row.firstName, {
      id: "firstName",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">FirstName</span>,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">LastName</span>,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Email</span>,
    }),
    columnHelper.accessor((row) => row.username, {
      id: "username",
      cell: (info) => <p className="">{info.getValue()?.toLocaleString()}</p>,
      header: () => <span className="">Username</span>,
    }),
    columnHelper.accessor("id", {
      enableSorting: false,
      meta: { thClassName: "w-10" },
      cell: (row) => (
        <div className="flex items-center justify-center w-full">
          <TrashButton
            onClick={(e) => {
              openDeleteModal({
                onConfirm: () => deleteUser(row.getValue()),
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
      data={UserData}
      columns={columns}
      apiPagination={UserPagination}
      entityPlural="Users"
      isLoading={isLoading}
      onRowClick={(row) => router.push(`/settings/users/${row.id}`)}
    />
  );
}
