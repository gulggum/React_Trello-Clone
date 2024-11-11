import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, ITodoState, toDoState } from "../atoms";

interface IDragging {
  isDragging: boolean;
}
const Card = styled.div<IDragging>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? "tomato" : "white")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.div`
  button {
    margin-top: 11px;
    background: none;
    border: none;
    height: 30px;
    margin-top: -10px;
    cursor: pointer;
  }
`;

interface IDragabbleCardProps {
  TodoId: number;
  TodoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  TodoId,
  index,
  TodoText,
  boardId,
}: IDragabbleCardProps) {
  const setAllBoards = useSetRecoilState(toDoState);
  const onDelete = () => {
    setAllBoards((prevBoards: ITodoState) => {
      const upDateBoard = prevBoards[boardId].filter(
        (todo) => todo.TodoId !== TodoId
      );
      return {
        ...prevBoards,
        [boardId]: upDateBoard,
      };
    });
  };

  return (
    <Draggable draggableId={TodoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {TodoText}
          <Button>
            <button>✏️</button>
            <button onClick={onDelete}>❌</button>
          </Button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
