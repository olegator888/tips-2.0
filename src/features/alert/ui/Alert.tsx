import { useAlertStore } from "@/features/alert/storage";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui";

export const Alert = () => {
  const { isOpen, title, subtitle, onConfirm, onCancel } = useAlertStore();

  const onOpenChange = (isOpen: boolean) => useAlertStore.setState({ isOpen });

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title || "Вы уверены?"}</DrawerTitle>
          <DrawerDescription>
            {subtitle || "Это действие необратимо"}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive" onClick={handleConfirm}>
            Подтвердить
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full" onClick={handleCancel}>
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
