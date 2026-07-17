"use client";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Earl John Gomez</h1>
        <p className="text-lg text-gray-600">Developer &amp; Designer</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">SHR Doctor Side</h3>
            <p className="text-gray-600">CodeIgniter 3 · PHP · MySQL · Bootstrap 5</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">HeritagePark Taguig</h3>
            <p className="text-gray-600">Web development project</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-600">earljohngomez@example.com</p>
      </section>
    </main>
  );
}
