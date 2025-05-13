"use client"

import { AdminLayout } from "@/components/admin-layout"
import { AdminReports } from "@/components/admin/admin-reports"

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reportes y Estadísticas</h1>
        </div>
        <AdminReports />
      </div>
    </AdminLayout>
  )
}
