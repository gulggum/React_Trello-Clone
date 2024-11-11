import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

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

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  input {
    width: 80%;
    border: none;
    border-radius: 5px;
    padding: 5px;
  }
  button {
    background: none;
    border: none;
    height: 30px;
    font-size: 15px;
    margin-top: -10px;
    cursor: pointer;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, reset } = useForm<IForm>();

  const onVaild = ({ toDo }: IForm) => {
    const newTodo = {
      TodoId: Date.now(),
      TodoText: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    console.log(toDo);
    reset();
  };
  return (
    <BoardBox>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("toDo", { required: true })}
          placeholder={`Write ${boardId} please`}
        />
        <button>✔️</button>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Wrapper
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.TodoId}
                index={index}
                TodoText={toDo.TodoText}
                TodoId={toDo.TodoId}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </BoardBox>
  );
}

export default Board;
