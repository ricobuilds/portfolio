async function generateIsoDate() {
  console.log(new Date().toISOString())
  return;
}

generateIsoDate()
  .then(() => console.log("Executed generateIsoDate script successfully!"))
  .catch(console.error);