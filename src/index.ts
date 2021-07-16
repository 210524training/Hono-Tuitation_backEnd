import app from './app';

const port = 5000;
console.log(`Attempting to start on port ${port}`);
app.listen(port, () => {
  console.log(`Server has started listining on port ${port}`);
});
