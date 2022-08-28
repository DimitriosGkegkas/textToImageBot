import { createModule, InMemoryUser, Module } from "@ebenos2/framework";

const start: Module<InMemoryUser> = createModule("start");

export default start;

import "./actions";
