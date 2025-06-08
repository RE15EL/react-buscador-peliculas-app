// Función para obtener posts paginados
export async function fetchPosts(page = 1, limit = 10) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Error al cargar los posts');
  }
  
  const total = response.headers.get('x-total-count');
  return {
    posts: await response.json(),
    totalPages: Math.ceil(total / limit),
    hasMore: page < Math.ceil(total / limit)
  };
}

// Función para obtener posts adicionales (infinite scroll)
export async function fetchMorePosts({ pageParam = 1 }) {
  const limit = 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Error al cargar más posts');
  }
  
  return {
    posts: await response.json(),
    nextPage: pageParam + 1,
    hasMore: pageParam < 10 // Limitar a 10 páginas para el ejemplo
  };
}
