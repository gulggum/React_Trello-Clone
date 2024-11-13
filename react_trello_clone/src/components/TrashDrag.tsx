import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ITrashIconProps {
  isDraggingOver: boolean;
}

const TrashIcon = styled.div<ITrashIconProps>`
  height: 50px;
  font-size: 30px;
  transform: ${(props) => (props.isDraggingOver ? "scale(1.2)" : "scale(1)")};
  transition: trasform 0.1s ease;
  position: relative;
`;

function TrashDrag() {
  return (
    <Droppable droppableId="trash">
      {(magic, snapshot) => (
        <TrashIcon
          ref={magic.innerRef}
          {...magic.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <span>🗑️</span>
          {magic.placeholder}
        </TrashIcon>
      )}
    </Droppable>
  );
}

export default TrashDrag;
