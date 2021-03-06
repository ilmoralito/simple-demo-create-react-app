const data = [
  {
    id: 3868,
    title: "Jornada 6",
    date: "08/17/2021",
    field: { id: "229", title: "Field 2" },
    matches: [
      {
        id: "3869",
        title: "Another teem meet with logo example VS El paraiso",
      },
      { id: "3870", title: "Default logo VS Gil" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
  {
    id: 3865,
    title: "Jornada 5",
    date: "08/16/2021",
    field: { id: "228", title: "Field 1" },
    matches: [
      {
        id: "3866",
        title: "Another teem meet with logo example VS Default logo",
      },
      { id: "3867", title: "El paraiso VS Gil" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
  {
    id: 3862,
    title: "Jornada 4",
    date: "08/10/2021",
    field: { id: "229", title: "Field 2" },
    matches: [
      { id: "3863", title: "Default logo VS El paraiso" },
      { id: "3864", title: "Another teem meet with logo example VS Gil" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
  {
    id: 3859,
    title: "Jornada 3",
    date: "08/09/2021",
    field: { id: "228", title: "Field 1" },
    matches: [
      { id: "3860", title: "Another teem meet with logo example VS Gil" },
      { id: "3861", title: "Default logo VS El paraiso" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
  {
    id: 3856,
    title: "Jornada 2",
    date: "08/03/2021",
    field: { id: "229", title: "Field 2" },
    matches: [
      {
        id: "3857",
        title: "Another teem meet with logo example VS El paraiso",
      },
      { id: "3858", title: "Default logo VS Gil" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
  {
    id: 3853,
    title: "Jornada 1",
    date: "08/02/2021",
    field: { id: "228", title: "Field 1" },
    matches: [
      {
        id: "3854",
        title: "Another teem meet with logo example VS Default logo",
      },
      { id: "3855", title: "El paraiso VS Gil" },
    ],
    collision: "",
    isEditing: false,
    isConfirming: false,
  },
];

const orderBy = -1;

const output = data
  .slice(0)
  .sort((a, b) =>
    orderBy === 1
      ? a.title.match(/\d/g)[0] - b.title.match(/\d/g)[0]
      : b.title.match(/\d/g)[0] - a.title.match(/\d/g)[0]
  );

console.log(output);
