"use client"

import { UserLayout } from "@/components/user-layout"
import { FinancialDashboard } from "@/components/user/financial-dashboard"

export default function UserFinancesPage() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mis Finanzas</h1>
        </div>
        <FinancialDashboard />
      </div>
    </UserLayout>
  )
}
