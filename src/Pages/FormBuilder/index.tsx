import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDrop } from "./dragDrop";
export function FormBuilder() {

    return <DndProvider backend={HTML5Backend}> <DragDrop /> </DndProvider>
}
