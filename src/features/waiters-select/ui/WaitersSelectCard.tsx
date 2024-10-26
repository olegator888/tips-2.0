import { Button } from "@/shared/ui";
import { IWaiter } from "@/entities/waiter";
import { cn } from "@/shared/lib";

interface Props {
  waiter: IWaiter;
  isSelected: boolean;
  toggleWaiterSelected: (waiterId: IWaiter["id"]) => void;
}

export const WaitersSelectCard = (props: Props) => {
  const { waiter, isSelected, toggleWaiterSelected } = props;

  const onClick = () => toggleWaiterSelected(waiter.id);

  return (
    <Button
      onClick={onClick}
      variant={isSelected ? "default" : "outline"}
      size="sm"
      className={cn(isSelected && "border border-transparent")} // prevent card jumping on selected toggle
    >
      {waiter.name}
    </Button>
  );
};
