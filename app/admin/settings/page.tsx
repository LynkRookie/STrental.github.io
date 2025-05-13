"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Lock, Bell, Shield } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Permisos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>Configura los ajustes generales del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-name">Nombre del Sistema</Label>
                  <Input id="system-name" defaultValue="Sistema de Arriendo por Habitaciones" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email de Administración</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda Predeterminada</Label>
                  <Input id="currency" defaultValue="CLP" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Modo de Mantenimiento</h4>
                    <p className="text-sm text-muted-foreground">
                      Activa el modo de mantenimiento para realizar actualizaciones
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Configura los ajustes de seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Política de Contraseñas</Label>
                  <Input id="password-policy" defaultValue="8 caracteres mínimo, 1 mayúscula, 1 número" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Autenticación de Dos Factores</h4>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para todos los administradores</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Bloqueo de Cuentas</h4>
                    <p className="text-sm text-muted-foreground">
                      Bloquear cuentas después de 5 intentos fallidos de inicio de sesión
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>Configura cómo se envían las notificaciones del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificaciones por Email</h4>
                    <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificaciones de Nuevos Usuarios</h4>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones cuando se registre un nuevo usuario
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificaciones de Nuevas Propiedades</h4>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones cuando se registre una nueva propiedad
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button>Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Permisos</CardTitle>
                <CardDescription>Configura los permisos para los diferentes roles de usuario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Permisos de Administrador</h3>
                  <div className="space-y-2">
                    {[
                      "Gestionar usuarios",
                      "Gestionar propiedades",
                      "Ver reportes financieros",
                      "Exportar datos",
                      "Configurar sistema",
                    ].map((permission, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">{permission}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Permisos de Arrendador</h3>
                  <div className="space-y-2">
                    {[
                      "Gestionar propiedades propias",
                      "Gestionar arrendatarios",
                      "Ver reportes financieros propios",
                      "Exportar datos propios",
                    ].map((permission, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">{permission}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <Button>Guardar Permisos</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
