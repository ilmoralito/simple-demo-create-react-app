// @ts-check

const baseURL = process.env.REACT_APP_API_BASE_URL;

const person = {
  name: "ada",
};

export async function getPeople() {
  const response = await fetch(`${baseURL}/people`);

  return await response.json();
}

/**
 *
 * @param {number} id
 */
export async function getPerson(id) {
  const response = await fetch(`${baseURL}/people/${id}`);
  person.name = "1";
  return await response.json();
}

/**
 *
 * @param {Object} payload
 */
export async function postPerson(payload) {
  const response = await fetch(`${baseURL}/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}

/**
 *
 * @param {Object} payload
 */
export async function updatePerson(payload) {
  const { id, firstName, lastName } = payload;

  const response = await fetch(`${baseURL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  return await response.json();
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
function yell(string) {
  return string.toUpperCase();
}

console.log(yell("1"));
