"use client"

import { useState } from "react"
import { UserLayout } from "@/components/user-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Home, Users, DollarSign, Settings, PlusCircle } from "lucide-react"
import { PropertyList } from "@/components/user/property-list"
import { TenantList } from "@/components/user/tenant-list"
import { FinancialDashboard } from "@/components/user/financial-dashboard"
import { UserSettings } from "@/components/user/user-settings"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("properties")

  return (
    <UserLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Panel de Usuario</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Propiedad
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Habitaciones</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 ocupadas, 4 disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Arrendatarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,240,000</div>
              <p className="text-xs text-muted-foreground">+$240,000 desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="properties" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Propiedades
            </TabsTrigger>
            <TabsTrigger value="tenants" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Arrendatarios
            </TabsTrigger>
            <TabsTrigger value="finances" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Finanzas
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4">
            <PropertyList />
          </TabsContent>

          <TabsContent value="tenants" className="space-y-4">
            <TenantList />
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <FinancialDashboard />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  )
}
