"use client"

import { UserLayout } from "@/components/user-layout"
import { TenantList } from "@/components/user/tenant-list"

export default function UserTenantsPage() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mis Arrendatarios</h1>
        </div>
        <TenantList />
      </div>
    </UserLayout>
  )
}
