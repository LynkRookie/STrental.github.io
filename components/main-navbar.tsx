"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, MenuIcon, X } from "lucide-react"
import { useState } from "react"

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <HomeIcon className="h-6 w-6" />
          <span>Sistema de Arriendo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Inicio
          </Link>
          <Link href="/properties" className="text-sm font-medium hover:underline underline-offset-4">
            Propiedades
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            Acerca de
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contacto
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/properties"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Propiedades
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Acerca de
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
