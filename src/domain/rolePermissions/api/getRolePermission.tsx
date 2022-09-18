import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { RolePermissionDto, RolePermissionKeys } from "@/domain/rolePermissions";

const getRolePermission = async (id: string) => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/rolepermissions/${id}`)
    .then((response: AxiosResponse<RolePermissionDto>) => response.data);
};

export const useGetRolePermission = (id: string | null | undefined) => {
  return useQuery(RolePermissionKeys.detail(id!), () => getRolePermission(id!), {
    enabled: id !== null && id !== undefined,
  });
};
;
