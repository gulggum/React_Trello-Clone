import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  padding: 30px 20px;
  border-radius: 5px;
  min-height: 200px;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    /* setToDos((oldToDos) => {
      if (!destination) return oldToDos;

      const toDoCopy = [...oldToDos];
      // 1) 시작한곳에서 삭제
      toDoCopy.splice(source.index, 1);
      // 2) 종료지점에 추가
      toDoCopy.splice(destination?.index, 0, draggableId);
      return toDoCopy;
    }); */
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
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
