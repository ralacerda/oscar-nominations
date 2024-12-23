export default eventHandler(async () => {
  return await db.query.oscars.findMany();
});
