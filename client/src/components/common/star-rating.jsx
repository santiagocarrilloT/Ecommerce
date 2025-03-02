import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StartRaitingComponent({ raiting, handleRaitingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      className={`p-2 rounded-full transition-colors ${
        star <= raiting
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRaitingChange ? () => handleRaitingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= raiting ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StartRaitingComponent;
