const fs = require("fs");
const { parse } = require("csv-parse");
const connectDB = require("./db/connect");
require("dotenv").config();
const Sensex = require("./models/BSESENSEX");
const { exit } = require("process");
var results = [];

const dayDict = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// fs.createReadStream("./dev-data/data/Data.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", async function (dataRow) {
//     const open = Number(dataRow[1]);
//     const close = Number(dataRow[4]);
//     var date = dataRow[0].split("-");
//     var day = Number(date[0]);
//     var month = Number(dayDict[date[1]]);
//     const year = Number(date[2]);
//     var mongoDate = new Date(year, month, day);

//     results.push({ date: mongoDate, open, close });
//   })
//   .on("error", function (err) {
//     console.log(err.message);
//   })
//   .on("end", async function () {});

// const reading = async () => {
//   await connectDB(process.env.MONGO_URI);
//
connectDB(process.env.MONGO_URI);
fs.createReadStream("./dev-data/data/Data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (dataRow) {
    const open = dataRow[1];
    const close = dataRow[4];
    var date = dataRow[0].split("-");
    var day = Number(date[0]);
    var month = Number(dayDict[date[1]]);
    const year = Number(date[2]);
    var mongoDate = new Date(year, month, day);
    results.push({ date: mongoDate, open, close });

    // await Sensex.create({ mongoDate, open, close });
    // await Sensex.create({ date, open, close });
  })
  .on("error", function (err) {
    console.log(err.message);
  })
  .on("end", async function () {
    await Sensex.deleteMany();
    await Sensex.create(results);
    exit(0);
  });

// connectDB(process.env.MONGO_URI);
// const create = async () => {
//   const date = new Date();
//   const open = 21;
//   const close = 35;
//   const newSensex = await Sensex.create({ date, open, close });
//   console.log(newSensex);
// };

// start();
// create();
