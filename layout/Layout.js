import Head from "next/head";

// Components
import Sidebar from "../components/Sidebar";

export default function Layout({ children, pagina }) {
  return (
    <>
      {/* Head dinamico para mejorar SEO */}
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Web Cafeteria" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 h-screen">
          <Sidebar />
        </aside>

        {/* overflow-y-scroll permite que el el componente aside se mantenga aun cuando hagamos scroll en este componente */}
        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            {/* Componente hijo */}
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
