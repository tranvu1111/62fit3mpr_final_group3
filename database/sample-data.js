import Note from "../models/Note";
import Label from "../models/Label";
import Folder from "../models/Folder";

export const LABELS = [
  new Label("l1", "React Native"),
  new Label("l2", "Redux"),
  new Label("l3", "Mini project"),
  new Label("l4", "Work"),
  new Label("l5", "React Basics"),
];

export const COLORS = [
  null,
  "lightseagreen",
  "skyblue",
  "lightcoral",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightyellow",
  "orange",
];
export const FOLDERS = [
  new Folder("f0", "Default", new Date("2024-5-10T9:30:00")),
  new Folder("f1", "Week 1", new Date("2024-5-10T10:30:00")),
  new Folder("f2", "Week 2", new Date("2024-5-10T11:30:00")),
];
export const NOTES = [
  new Note(
    "n1",
    null,
    ["l1", "l2"],
    "Final Project",
    new Date("2024-5-10T12:30:00").toISOString(),
    false,
    "f0"
  ),
  new Note(
    "n2",
    COLORS[1],
    null,
    "Test",
    new Date("2024-5-10T12:30:00").toISOString(),
    true,
    FOLDERS[1]
  ),
  new Note(
    "n3",
    COLORS[2],
    ["l3", "l4"],
    "Work on mini project",
    new Date("2024-5-11T09:00:00").toISOString(),
    false,
    "f1"
  ),
  new Note(
    "n4",
    COLORS[3],
    ["l5"],
    "Learn React Basics",
    new Date("2024-5-12T14:00:00").toISOString(),
    true,
    "f2"
  ),
  new Note(
    "n5",
    null,
    ["l1", "l3"],
    "Integrate Redux with React Native",
    new Date("2024-6-06T16:30:00").toISOString(),
    true,
    "f2"
  ),
  new Note(
    "n12",
    COLORS[4],
    ["l2"],
    "Discarded note",
    new Date("2024-5-14T12:00:00").toISOString(),
    false,
    "f1"
  ),
];

export const TRASH = [
  new Note(
    "n6",
    COLORS[4],
    ["l2"],
    "Discarded note",
    new Date("2024-5-14T12:00:00").toISOString(),
    false,
    "f1"
  ),
  new Note(
    "n7",
    null,
    ["l4"],
    "Old Work Note",
    new Date("2024-5-15T08:30:00").toISOString(),
    true,
    "f0"
  ),
  new Note(
    "n8",
    COLORS[5],
    ["l3"],
    "Another discarded note",
    new Date("2024-5-16T10:45:00").toISOString(),
    false,
    "f2"
  ),
];
