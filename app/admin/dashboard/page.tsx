"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, Home, DollarSign, BarChart3, FileText, Download } from "lucide-react"
import { AdminUserList } from "@/components/admin/admin-user-list"
import { AdminPropertyList } from "@/components/admin/admin-property-list"
import { AdminFinancialDashboard } from "@/components/admin/admin-financial-dashboard"
import { AdminReports } from "@/components/admin/admin-reports"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administrador</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Datos
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propiedades Totales</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Habitaciones Ocupadas</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,540,000</div>
              <p className="text-xs text-muted-foreground">+$1,240,000 desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Propiedades
            </TabsTrigger>
            <TabsTrigger value="finances" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Finanzas
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AdminFinancialDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <AdminUserList />
          </TabsContent>

          <TabsContent value="properties" className="space-y-4">
            <AdminPropertyList />
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <AdminFinancialDashboard />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <AdminReports />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
