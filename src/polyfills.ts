// Ensure Node-y globals exist in the browser *before* other imports.
import processShim from "process";
import { Buffer } from "buffer";

declare global {
  interface Window {
    global?: any;
    process?: any;
    Buffer?: any;
  }
}

// Some libs expect global to exist
if (!window.global) window.global = window;

// Provide a process shim with a version string so code like process.version.slice(...) works
if (!window.process) window.process = processShim;
if (!window.process.version) window.process.version = "0.0.0";

// Buffer (used by various crypto/stream shims)
if (!window.Buffer) window.Buffer = Buffer;

