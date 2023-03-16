#!/usr/bin/env node
const path = require("path");
const url = require("url");

process.env.NODE_ENV = "production";
import(url.pathToFileURL(path.join(__dirname, "..", "server", "src", "index.js")));
