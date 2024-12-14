export default eventHandler(() => {
  return db.query.awards.findMany()
})
