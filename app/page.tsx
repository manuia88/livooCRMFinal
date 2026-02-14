export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Livoo CRM
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Plataforma Inmobiliaria de Clase Mundial
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/backoffice/dashboard"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition"
          >
            Ir al Backoffice
          </a>
          <a
            href="/buscar"
            className="px-6 py-3 bg-card text-card-foreground border border-border rounded-lg hover:bg-muted transition"
          >
            Ver Propiedades
          </a>
        </div>
      </div>
    </main>
  );
}
