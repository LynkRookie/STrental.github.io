"use client"

import { AdminLayout } from "@/components/admin-layout"
import { AdminUserList } from "@/components/admin/admin-user-list"

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        </div>
        <AdminUserList />
      </div>
    </AdminLayout>
  )
}
