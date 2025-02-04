import { Button } from "./ui/button";
import { StopIcon } from "./icons";

export default function StopButton({
  stop,
}: {
  stop: () => void;
}) {
  return (
    <Button
      className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        stop();
      }}
    >
      <StopIcon size={14} />
    </Button>
  );
}