let balances = db.people.aggregate([
  { $unwind: "$credit" },
  {
    $group: {
      _id: "$credit.currency",
      balance: { $sum: { $toDouble: "$credit.balance" } },
    },
  },
]);

printjson(balances.toArray());
