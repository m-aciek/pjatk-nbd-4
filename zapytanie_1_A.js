let aggregation = db.people.aggregate([{ $group: { _id: "$sex", avgWeight: { $avg: { $toDouble: "$weight" } } } }])
printjson(aggregation.toArray())
