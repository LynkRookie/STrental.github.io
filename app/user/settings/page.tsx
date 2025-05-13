"use client"

import { UserLayout } from "@/components/user-layout"
import { UserSettings } from "@/components/user/user-settings"

export default function UserSettingsPage() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mi Configuración</h1>
        </div>
        <UserSettings />
      </div>
    </UserLayout>
  )
}
