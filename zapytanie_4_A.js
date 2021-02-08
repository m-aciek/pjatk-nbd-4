let bmis = db.people.aggregate([
  {
    $addFields: {
      bmi: {
        $divide: [
          { $toDouble: "$weight" },
          { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$nationality",
      minBmi: { $min: "$bmi" },
      maxBmi: { $max: "$bmi" },
      avgBmi: { $avg: "$bmi" },
    },
  },
]);
printjson(bmis.toArray());
