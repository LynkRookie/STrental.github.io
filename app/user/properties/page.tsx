"use client"

import { UserLayout } from "@/components/user-layout"
import { PropertyList } from "@/components/user/property-list"

export default function UserPropertiesPage() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mis Propiedades</h1>
        </div>
        <PropertyList />
      </div>
    </UserLayout>
  )
}
