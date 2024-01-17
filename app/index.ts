import yargs from "yargs";
import chalk from "chalk";
import {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
} from "./model/task";

// tạo lệnh test
// node app/index.ts test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// CRUD

// create - node app/index.ts create --title="Hoc NodeJS" --description="Dau kho lam dau"
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("đã tạo mới công việc thành công : ", newTask);
  },
});

// read-all - node app/index.ts read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(chalk.blue("taskJson : "), result);
  },
});

// read-detail - node app/index.ts read-detail --id="123"
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log("task : ", task);
    } else {
      console.log("Not Found!");
    }
  },
});

// update - node app/index.ts update --id="123" --title="Hoc JS" --description="kho lam"
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log("task updated : ", task);
    } else {
      console.log(chalk.red("Not Found!"));
    }
  },
});

// delete - node app/index.ts delete --id="123"
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log("delete task : ", task);
    } else {
      console.log("Not Found");
    }
  },
});

// lưu lại các lệnh vừa tạo
yargs.parse();
