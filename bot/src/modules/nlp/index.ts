import { createModule, Module } from "@ebenos2/framework";
import User from "../../models/User";

const nlp: Module<User> = createModule("nlp");

export default nlp;

import "./router";
