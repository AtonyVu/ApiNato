const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const findById = (id) => {
  const tour = tours.find((item) => item.id == id);
  return tour;
};
const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: "Success ", result: tours.length, data: { tours } });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = findById(id);
  if (tour == null) {
    res.status(404).json({ status: "failed", message: "Invalid tour" });
  }
  res.status(200).json({ status: "Success ", data: { tour } });
};
const UpdateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = findById(id);
  if (tour == null) {
    res.status(404).json({ status: "failed", message: "Invalid tour" });
  }
  res.status(200).json({ status: "Success update", data: { tour } });
};
const DeleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = findById(id);
  if (tour == null) {
    res.status(404).json({ status: "failed", message: "Invalid tour" });
  }
  res.status(200).json({ status: "Success delete " });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  console.log(req.body);
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({ status: "Them Thanh cong", data: newTours });
    }
  );
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(UpdateTour)
  .delete(DeleteTour);

app.listen(port, () => {
  console.log("App running port" + port);
});
