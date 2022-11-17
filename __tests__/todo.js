/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
let dateToday = new Date();
const now = formattedDate(dateToday);
const that_day = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "rahul",
      completed: false,
      dueDate: now,
    });
  });
  test("Should add new todo", () => {
    add(
      {
        title: "opz",
        completed: false,
        dueDate: tomorrow,
        //console.log(dueDate),
      },
      {
        title: "rahul test1",
        completed: false,
        dueDate: that_day,
      }
    );
    const todoItemCount = all.length;
    add({
      title: "opz test1",
      completed: false,
      dueDate: that_day,
    });
    add({
      title: "exercise",
      completed: false,
      dueDate: that_day,
    });
    add({
      title: "playing bgmi",
      completed: true,
      dueDate: that_day,
    });

    expect(all.length).toBe(todoItemCount + 3);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should check retrieval of overdue items", () => {
    a = overdue();
    expect(all[2].dueDate).toBe(a[0]["dueDate"]);
  });
  test("Should check retrieval of duetoday items", () => {
    a = dueToday();
    expect(all[0].dueDate).toBe(a[0]["dueDate"]);
  });
  test("Should check retrieval of due later items", () => {
    a = dueLater();
    expect(all[1].dueDate).toBe(a[0]["dueDate"]);
  });
  test("to maintain habit of doing exercise daily", () => {
    a = dueLater();
    expect(all[3].completed).toBe(false);
  });
  test("play bgmi daily", () => {
    a = dueLater();
    expect(all[4].completed).toBe(true);
  });
});
