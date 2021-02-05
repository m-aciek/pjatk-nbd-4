printjson(
  db.people
    .aggregate([{ $group: { _id: null, uniqueValues: { $addToSet: "$job" } } }])
    .toArray()[0].uniqueValues
);
