
import { Spinner } from "@medusajs/icons";

export default function Loader() {
  return (
    <div className="flex justify-center">
      <Spinner className="animate-spin" />
    </div>
  );
}
