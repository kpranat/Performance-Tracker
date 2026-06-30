import { fetchVolunteers } from "./fetchVolunteers";

const rows = await fetchVolunteers();

console.log(rows);
