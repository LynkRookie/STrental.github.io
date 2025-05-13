"use client"

import { AdminLayout } from "@/components/admin-layout"
import { AdminFinancialDashboard } from "@/components/admin/admin-financial-dashboard"

export default function AdminFinancesPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Finanzas del Sistema</h1>
        </div>
        <AdminFinancialDashboard />
      </div>
    </AdminLayout>
  )
}
