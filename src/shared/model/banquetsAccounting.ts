export type IBanquetField = "order" | "preorder";

export interface ToggleBanquetEditingProps {
  banquetId: string;
  field: IBanquetField;
  userName: string;
  isEditing: boolean;
}
