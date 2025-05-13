"use client"

import { AdminLayout } from "@/components/admin-layout"
import { AdminPropertyList } from "@/components/admin/admin-property-list"

export default function AdminPropertiesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Propiedades</h1>
        </div>
        <AdminPropertyList />
      </div>
    </AdminLayout>
  )
}
