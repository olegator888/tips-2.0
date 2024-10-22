import { useRouteError } from "react-router-dom";
import { Button } from "@/shared/ui";

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);

  const reloadPage = () => window.location.reload();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center border border-primary shadow-xl rounded-md p-4">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="mb-4">
          <i>{error.message}</i>
        </p>
        <Button variant="outline" onClick={reloadPage}>
          Reload
        </Button>
      </div>
    </div>
  );
};
