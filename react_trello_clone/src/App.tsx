import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import TrashDrag from "./components/TrashDrag";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  align-items: center;

  flex-direction: column;
  padding: 40px 20px;
`;
const Headers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div:last-child {
    margin-top: 10px;
  }
`;

const Titie = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  padding: 20px 20px;
  border-radius: 5px;
  min-height: auto;
  gap: 20px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    console.log(destination?.droppableId);
    if (!destination) return;
    //쓰레기통 드래그 삭제기능
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const removeCard = [...allBoards[source.droppableId]];
        removeCard.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: removeCard };
      });
    } else if (destination?.droppableId === source?.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) 시작한곳에서 삭제
        boardCopy.splice(source.index, 1);
        // 2) 종료지점에 추가
        boardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source?.droppableId) {
      //cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destiBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destiBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destiBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Headers>
          <div></div>
          <Titie>Todo Trello</Titie>
          <div>
            <TrashDrag />
          </div>
        </Headers>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Container>
    </DragDropContext>
  );
}

export default App;
