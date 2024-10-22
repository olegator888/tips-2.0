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
  const { isOpen, title, subtitle } = useAlertStore();

  const onOpenChange = (isOpen: boolean) => useAlertStore.setState({ isOpen });

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
          <Button variant="destructive">Подтвердить</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
