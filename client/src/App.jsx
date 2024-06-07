import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import todoService from "./service/todoService";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [mainForm, setMainForm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTodo, setSelectedTodo] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [allData, setAllData] = useState([]);

  const { getAllTodo, createTodo, deleteTodo, updateTodo } = todoService();

  const todos = allData.filter(
    (item) => item.onProgress === false && item.status === false
  );
  const onProgressTodos = allData.filter((item) => item.onProgress === true);
  const doneTodos = allData.filter(
    (item) => item.status === true && item.onProgress === false
  );

  const getAllData = async () => {
    try {
      const res = await getAllTodo();
      if (res) {
        setAllData(res);
        console.log("all data from state: ", allData);
      } else {
        console.log("error get all data");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const newTodo = async () => {
    const payload = { todo: mainForm };
    console.log("payload, ", payload);
    try {
      const res = await createTodo(payload);
      setMainForm("");
      if (res) {
        console.log("success create new todo");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const submitUpdateTodo = async (id) => {
    let data;
    switch (selectedStatus) {
      case "ONPROGRESS":
        data = {
          todo: selectedTodo,
          onProgress: true,
        };
        break;
      case "DONE":
        data = {
          todo: selectedTodo,
          onProgress: false,
          status: true,
        };
        break;
      case "TODO":
        data = {
          todo: selectedTodo,
          onProgress: false,
          status: false,
        };
        break;
      default:
        console.log("Status Salah");
        break;
    }
    try {
      const res = await updateTodo({ id: id, data: data });
      if (res) {
        setOpenModal(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTodoData = async (id) => {
    try {
      const res = await deleteTodo(id);
      if (res) {
        console.log("delete success");
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSelectedTodo = (data) => {
    setOpenModal(true);
    setSelectedId(data._id);
    setSelectedTodo(data.todo);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const TodoComponent = ({ data }) => {
    return (
      <div
        className="flex bg-blue-950 px-4 py-4 rounded-md"
        onClick={() => handleSelectedTodo(data)}
      >
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-xl text-white">{data.todo}</h3>
          <div
            className="cursor-pointer"
            onClick={() => deleteTodoData(data._id)}
          >
            <FaTrashAlt className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-slate-100">
      <div className="flex flex-col items-center py-8">
        <h1 className="text-black font-extrabold text-2xl">MY TODO MANAGER</h1>
        <form className="flex mt-8 gap-2">
          <TextInput
            id="todo"
            color="light"
            className="w-72"
            type="text"
            value={mainForm}
            onChange={(event) => setMainForm(event.target.value)}
            required
          />
          <Button color="blue" onClick={newTodo}>
            Add
          </Button>
        </form>
        <div className="flex flex-row mt-8 gap-8 w-3/5">
          <div className="basis-1/3">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center bg-blue-600 px-4 py-4 rounded-md">
                <h3 className="font-bold text-xl text-white">TODO</h3>
              </div>
              {todos?.map((item, idx) => {
                return (
                  <div key={idx}>
                    <TodoComponent data={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="basis-1/3">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center bg-orange-500 px-4 py-4 rounded-md">
                <h3 className="font-bold text-xl text-white">ON PROGRESS</h3>
              </div>
              {onProgressTodos?.map((item, idx) => {
                return (
                  <div key={idx}>
                    <TodoComponent data={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="basis-1/3">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center bg-green-500 px-4 py-4 rounded-md">
                <h3 className="font-bold text-xl text-white">DONE</h3>
              </div>
              {doneTodos?.map((item, idx) => {
                return (
                  <div key={idx}>
                    <TodoComponent data={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <form className="flex flex-col gap-4">
              <Label htmlFor="todo" value="Todo" className="text-md" />
              <TextInput
                id="todo"
                color="light"
                type="text"
                value={selectedTodo}
                onChange={(event) => setSelectedTodo(event.target.value)}
              />
              <fieldset>
                <legend className="mb-4 text-white font-medium">
                  Status :
                </legend>
                <div className="flex justify-around">
                  <div className="flex flex-col gap-1 items-center">
                    <Radio
                      id="status_todo"
                      name="status"
                      value="TODO"
                      onChange={handleStatusChange}
                    />
                    <Label htmlFor="status">Todo</Label>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <Radio
                      id="onprogress"
                      name="status"
                      value="ONPROGRESS"
                      onChange={handleStatusChange}
                    />
                    <Label htmlFor="status">On Progress</Label>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <Radio
                      id="done"
                      name="status"
                      value="DONE"
                      onChange={handleStatusChange}
                    />
                    <Label htmlFor="status">Done</Label>
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-center gap-4 mt-2">
                <Button
                  color="success"
                  onClick={() => submitUpdateTodo(selectedId)}
                >
                  save
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default App;
