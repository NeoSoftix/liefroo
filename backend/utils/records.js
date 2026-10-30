// Saves a form submission; returns the saved document, or null when the
// database is unavailable (the error is logged and the request carries on).
async function saveRecord(Model, data) {
  try {
    return await Model.create(data);
  } catch (error) {
    console.error(`${Model.modelName} not saved:`, error.message);
    return null;
  }
}

// Records that the team notification for this submission went out.
function markMailSent(record) {
  record.constructor
    .updateOne({ _id: record._id }, { mailSent: true })
    .catch((error) => console.error(`${record.constructor.modelName} mailSent not updated:`, error.message));
}

module.exports = { saveRecord, markMailSent };
