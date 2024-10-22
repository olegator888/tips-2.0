import { AlertStore, useAlertStore } from "../storage";

type Props = Omit<AlertStore, "isOpen">;

export const withAlert = (props: Props) => () =>
  useAlertStore.setState({
    isOpen: true,
    ...props,
  });
