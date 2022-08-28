import { createModule, InMemoryUser, Module } from "@ebenos2/framework";

const createImage: Module<InMemoryUser> = createModule("createImage");

export default createImage;

import "./actions";
