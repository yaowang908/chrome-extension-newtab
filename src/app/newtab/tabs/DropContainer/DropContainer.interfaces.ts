export interface DropContainerProps {
  lastDroppedItem?: any;
  accepts: string[];
  onDrop: (arg: any) => void;
}