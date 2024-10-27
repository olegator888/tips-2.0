import { Button } from "./button";

interface Props {
  text: string;
  actionText?: string;
  action?: () => void;
}

export const Empty = (props: Props) => {
  const { text, actionText, action } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full">
      <p className="text-[18px] text-center italic text-muted-foreground max-w-[350px]">
        {text}
      </p>
      {action && actionText && <Button onClick={action}>{actionText}</Button>}
    </div>
  );
};
