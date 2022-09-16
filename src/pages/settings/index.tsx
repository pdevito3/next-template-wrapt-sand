import { Tabs } from "@/components/forms/Tabs";
import UsersTab from "@/components/settings/UsersTab";
import "@tanstack/react-table";
import { IconShieldLock, IconUser } from "tabler-icons";
import PrivateLayout from "../../components/PrivateLayout";

Settings.isPublic = false;
export default function Settings() {
  return (
    <PrivateLayout>
      <div className="space-y-6 max-w-9xl">
        <div className="">
          <h1 className="text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
            Settings
          </h1>

          <Tabs defaultValue="users">
            <Tabs.List>
              <Tabs.Tab value="users" icon={<IconUser className="w-5 h-5" />}>
                Users
              </Tabs.Tab>
              <Tabs.Tab
                value="rolepermissions"
                icon={<IconShieldLock className="w-5 h-5" />}
              >
                Role Permisisons
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="users" className="pt-5">
              <UsersTab />
            </Tabs.Panel>

            <Tabs.Panel value="rolepermissions" className="pt-5">
              TBD
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </PrivateLayout>
  );
}
