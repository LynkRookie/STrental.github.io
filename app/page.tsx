import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCarousel } from "@/components/property-carousel"
import { MainNavbar } from "@/components/main-navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />

      <main className="flex-1">
        <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Sistema de Arriendo por Habitaciones</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encuentra la habitación perfecta o gestiona tus propiedades en arriendo de manera eficiente.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Propiedades Destacadas</h2>
            <PropertyCarousel />
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sistema de Arriendo por Habitaciones. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
