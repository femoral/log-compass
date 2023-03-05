let i = 0;

const generateRandomString = (length) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

function writeLog() {
  const object = {
    ...{
      _id: "63fae98004a088ebc3d43233",
      index: 0,
      guid: "8876ff9a-adf4-49ff-be2d-4c633d89fa3b",
      isActive: true,
      balance: "$1,633.23",
      picture: "http://placehold.it/32x32",
      age: 35,
      eyeColor: "brown",
      name: "Patsy Shannon",
      gender: "female",
      company: "ZOGAK",
      email: "patsyshannon@zogak.com",
      phone: "+1 (951) 575-3681",
      address: "914 Campus Place, Alfarata, Texas, 2275",
      about:
        "Laborum sunt do ea tempor incididunt irure. Reprehenderit cupidatat aliqua mollit veniam officia non cillum. Id magna do culpa laboris. Dolor ullamco sunt enim non nulla exercitation reprehenderit magna excepteur enim magna eiusmod. Fugiat et duis ex Lorem occaecat laboris consequat adipisicing ipsum enim tempor. Irure qui ex exercitation ipsum id incididunt veniam laboris sit deserunt exercitation amet.\r\n",
      registered: "2015-03-06T02:03:07 +03:00",
      latitude: 2.475908,
      longitude: -0.130598,
      tags: ["non", "fugiat", "sit", "duis", "in", "ea", "exercitation"],
      friends: [
        {
          id: 0,
          name: "Hensley Ferrell",
        },
        {
          id: 1,
          name: "Burch Dennis",
        },
        {
          id: 2,
          name: "Salas Beard",
        },
      ],
      greeting: "Hello, Patsy Shannon! You have 6 unread messages.",
      favoriteFruit: "strawberry",
    },
    id: i++,
  };

  //object[generateRandomString(10)] = generateRandomString(10);

  process.stdout.write(
    "[2022-02-01] some stuff: " + JSON.stringify(object) + "\n"
  );
}

setInterval(() => {
  writeLog();
}, 60000);

writeLog();
