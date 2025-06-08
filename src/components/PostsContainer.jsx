import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchMorePosts, fetchPosts } from "../services/posts.service";
import { useState } from "react";

export function Posts() {
  // Estado para la paginación tradicional
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  // Consulta para la paginación inicial
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
    error: paginatedError,
  } = useQuery({
    queryKey: ["paginated-posts", page],
    queryFn: () => fetchPosts(page),
    keepPreviousData: true,
    onSuccess: (data) => {
      // Cuando llegamos a la última página, activamos "Cargar más"
      if (page === data.totalPages) {
        setShowLoadMore(true);
      }
    },
  });

  // Consulta para cargar más posts
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: isInfiniteError,
    error: infiniteError,
  } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: fetchMorePosts,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: showLoadMore, // Solo se habilita cuando showLoadMore es true
  });

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Si volvemos a páginas anteriores, ocultamos "Cargar más"
    if (newPage < paginatedData.totalPages) {
      setShowLoadMore(false);
    }
  };

  // Combinar todos los posts para renderizar
  const allPosts = [
    ...(paginatedData?.posts || []),
    ...(infiniteData?.pages.flatMap((page) => page.posts) || []),
  ];

  return (
    <div className="container">
      <h1>Posts Combinados</h1>
      <p>
        Página actual: {page} | Total posts: {allPosts.length}
      </p>

      {/* Lista de posts */}
      <div className="posts-grid">
        {allPosts.map((post) => (
          <article key={post.id} className="post-card">
            <h3>
              {post.id}. {post.title}
            </h3>
            <p>{post.body.substring(0, 60)}...</p>
          </article>
        ))}
      </div>

      {/* Paginación tradicional (solo visible si no estamos en modo "Cargar más") */}
      {!showLoadMore && paginatedData && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isPaginatedLoading}
          >
            Anterior
          </button>

          <span>
            Página {page} de {paginatedData.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === paginatedData.totalPages || isPaginatedLoading}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Botón "Cargar más" (visible solo en la última página) */}
      {showLoadMore && (
        <div className="load-more">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Cargando..."
              : hasNextPage
              ? "Cargar más posts"
              : "No hay más posts"}
          </button>
        </div>
      )}

      {/* Estados de carga y error */}
      {isPaginatedLoading && <p>Cargando página inicial...</p>}
      {isFetchingNextPage && <p>Cargando más posts...</p>}
      {(isPaginatedError || isInfiniteError) && (
        <p className="error">
          Error: {paginatedError?.message || infiniteError?.message}
        </p>
      )}
    </div>
  );
}
