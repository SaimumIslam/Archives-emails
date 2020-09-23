export function createData(id, from, to, subject, clip, date) {
  return { id, from, to, subject, clip, date };
}

export const rows = [
  createData(
    1,
    "Cupcake@exampssssssssssssssssssssssssssssssssssle.com",
    "Kit@example.com, hjhj.com",
    "far away",
    false,
    new Date("Sep 22 2020 19:43:58")
  ),
  createData(
    2,
    "Donut@example.com",
    "Eclair@example.com",
    "be cool",
    true,
    new Date("Sep 23 2020 19:43:08")
  ),
  createData(
    3,
    "Eclair@example.com",
    "yoghurt@example.com, Donut@example.com, hjhj.com",
    "Nobody",
    false,
    new Date("Sep 24 2020 19:43:58")
  ),
  createData(
    4,
    "Frozen@example.com",
    "Donut@example.com",
    "6.0, 24",
    true,
    new Date("Sep 28 2020 19:43:58")
  ),
  createData(
    5,
    "Bread@example.com",
    "Ginger@example.com",
    "age matter",
    false,
    new Date("Jan 24 2020 19:45:58")
  ),
  createData(
    6,
    "Honey@example.com",
    "comb@example.com",
    "Move ahed",
    false,
    new Date("Sep 24 2019 20:45:58")
  ),
  createData(
    7,
    "Ice@example.com",
    "cream@example.com",
    "look forward",
    false,
    new Date("Sep 27 2020 21:45:58")
  ),
  createData(
    8,
    "Jelly@example.com",
    "Bean@example.com",
    "Love is good",
    false,
    new Date("Sep 25 2020 19:45:58")
  ),
  createData(
    9,
    "Kit@example.com",
    "Kat@example.com",
    "This is far from",
    false,
    new Date("Sep 26 2020 19:45:58")
  ),
  createData(
    10,
    "Lolli@example.com",
    "pop@example.com",
    "no more than",
    false,
    new Date("Sep 7 2020 19:45:58")
  ),
  createData(
    11,
    "Marsh@example.com",
    "mallow@example.com",
    "the sea this is for test this is for test this is this is for test this is for test this is for test this is for test this is this is for test this is for test",
    true,
    new Date("Sep 29 2020 19:43:58")
  ),
  createData(
    12,
    "Nougat@example.com ",
    "Orio@example.com",
    "this is for test this is for test this is this is for test this is for test",
    false,
    new Date("Sep 23 2020 19:45:58")
  ),
];
