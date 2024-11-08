import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useRef } from "react";

const BoardBox = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  min-height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

interface IDraggingOver {
  isDraggingOver: boolean;
}
const Wrapper = styled.div<IDraggingOver>`
  flex-grow: 1; //flex한 컨테이너 내에서 얼마나 공간을 차지할지결정,기본값 0, 1은 가능한 공간을 모두 차지하려함
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.theme.boardColor};
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  padding: 14px;
  font-weight: 600;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <BoardBox>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Wrapper
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </BoardBox>
  );
}

export default Board;
