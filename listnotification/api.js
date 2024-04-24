const city = "planetcomm";

const api = {
  event: `http://127.0.0.1:8000/alert/event`,
};

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
