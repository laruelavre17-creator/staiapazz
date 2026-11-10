import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/categoria/$category")({
  beforeLoad: ({ params }) => {
    if (params.category !== "hash") {
      throw notFound();
    }

    throw redirect({ to: "/", hash: "catalogo", replace: true });
  },
});
