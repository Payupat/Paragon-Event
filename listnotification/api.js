const city = "planetcomm";

const api = {
  event: `http://172.16.100.30:8000/alert/event`,
};

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
