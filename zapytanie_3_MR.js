let jobs = db.people.mapReduce(
  function () {
    emit(this.job, null);
  },
  function (key, values) {
    return null;
  },
  { out: { inline: 1 } }
);
printjson(jobs.results);
