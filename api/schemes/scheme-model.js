const db = require("../../data/db-config");

async function find() {
  const rows = await db("schemes as sc")
    .select("sc.*")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .count("st.step_id as number_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id");

    return rows;
}

async function findById(scheme_id) {
  try {
    const rows = await db("schemes as sc")
      .select("sc.scheme_name", "st.*")
      .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
      .where("sc.scheme_id", scheme_id)
      .orderBy("st.step_number")

    let res = rows.reduce((acc, row) => {
      if(row.step_number)
        acc.steps.push({
          step_id: row.step_id, 
          step_number: row.step_number, 
          instructions: row.instructions
        })
      return acc;
    }, { scheme_id: scheme_id, scheme_name: rows[0].scheme_name, steps: [] } )

    return res;
  }
    catch (err) {
      return;
    }
}

async function findSteps(scheme_id) {
  const rows = await db("steps as st")
    .select("step_id", "step_number", "instructions", "scheme_name")
    .join("schemes as sc", "sc.scheme_id", "st.scheme_id")
    .where("st.scheme_id", scheme_id)
    .orderBy("st.step_number");

    return rows;
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => findById(id));
}

function addStep(scheme_id, step) { // EXERCISE E

  return db("steps")
    .insert({...step, scheme_id: scheme_id})
    .then( () => findSteps(scheme_id));
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
