import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Temps avant que les données soient considérées comme "stale" (périmées)
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Temps pendant lequel les données sont gardées en cache après qu'elles ne soient plus utilisées
      gcTime: 1000 * 60 * 10, // 10 minutes

      retry: (failureCount, error) => {
        // Ne pas retry pour les erreurs 4xx (client errors)
        if (error && typeof error === "object" && "status" in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        // Retry jusqu'à 3 fois pour les autres erreurs
        return failureCount < 3;
      },
      // Délai entre chaque tentative (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Recharger les données quand la fenêtre redevient active
      refetchOnWindowFocus: false,
      // Recharger les données quand on se reconnecte
      refetchOnReconnect: true,
      // Ne pas recharger lors d'un remount si les données sont encore valides
      refetchOnMount: true,
    },
    mutations: {
      // Nombre de tentatives en cas d'échec pour les mutations
      retry: 1,
      // Gestion des erreurs pour les mutations
      onError: (error) => {
        // Logging en développement
        if (import.meta.env.DEV) {
          console.error("[Mutation Error]", error);
        }
      },
    },
  },
});
