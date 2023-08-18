export default function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
}
