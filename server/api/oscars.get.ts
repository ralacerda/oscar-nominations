export default eventHandler(() => {
  return db.query.oscars.findMany();
});
