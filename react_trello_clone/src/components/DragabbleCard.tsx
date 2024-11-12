import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
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
`;

const CardEdit = styled.div`
  width: 100%;
  display: flex;
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

const EditInput = styled.input`
  width: 70%;
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
  const [allBoards, setAllBoards] = useRecoilState(toDoState);

  //현재 todo항목 찾기
  const todo = allBoards[boardId].find((todo) => todo.TodoId === TodoId);
  if (!todo) return null;

  const { isEditing, editText } = todo;

  //수정 시작기능
  const onEdit = () => {
    setAllBoards((prevBoards) => {
      const updateBoard = prevBoards[boardId].map((todo) => {
        if (todo.TodoId === TodoId) {
          return { ...todo, isEditing: true, editText: todo.TodoText };
        }
        return todo;
      });
      return { ...prevBoards, [boardId]: updateBoard };
    });
  };

  //수정버튼 클릭시 input값으로 변경
  const onChangeTextEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllBoards((prevBoards) => {
      const updateBoards = prevBoards[boardId].map((todo) => {
        if (todo.TodoId === TodoId) {
          return { ...todo, editText: event.currentTarget.value };
        }
        return todo;
      });
      return { ...prevBoards, [boardId]: updateBoards };
    });
  };

  const onSaveEdit = () => {
    setAllBoards((prevBoards) => {
      const updateBoards = prevBoards[boardId].map((todo) => {
        if (todo.TodoId === TodoId) {
          return { ...todo, isEditing: false, TodoText: editText };
        }
        return todo;
      });
      return {
        ...prevBoards,
        [boardId]: updateBoards,
      };
    });
  };

  //수정 취소기능
  const onCancelEdit = () => {
    setAllBoards((prevBoards) => {
      const updateBoard = prevBoards[boardId].map((todo) => {
        if (todo.TodoId === TodoId) {
          return { ...todo, isEditing: false, editText: todo.TodoText };
        }
        return todo;
      });
      return {
        ...prevBoards,
        [boardId]: updateBoard,
      };
    });
  };

  //삭제기능구현
  const onDelete = () => {
    setAllBoards((prevBoards: ITodoState) => {
      const updateBoard = prevBoards[boardId].filter(
        (todo) => todo.TodoId !== TodoId
      );
      return {
        ...prevBoards,
        [boardId]: updateBoard,
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
          {isEditing ? (
            <>
              <EditInput
                type="text"
                value={editText}
                onChange={onChangeTextEdit}
              ></EditInput>
              <Button>
                <button onClick={onSaveEdit}>✔️</button>
                <button onClick={onCancelEdit}>❌</button>
              </Button>
            </>
          ) : (
            <CardEdit>
              <>
                <div>{TodoText}</div>
                <Button>
                  <button onClick={onEdit}>✏️</button>
                  <button onClick={onDelete}>❌</button>
                </Button>
              </>
            </CardEdit>
          )}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
