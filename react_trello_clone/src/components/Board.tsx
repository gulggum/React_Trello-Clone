import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const BoardBox = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  min-height: 250px;
  border-radius: 5px;
`;
const Wrapper = styled.div``;

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
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
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
