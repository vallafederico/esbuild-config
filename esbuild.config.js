import { serve, build } from "esbuild";
import { glsl } from "esbuild-plugin-glsl";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

// console.log(env, production);

const FILES = {
  entry: ["app.js"],
  out: "build/js",
};

const SETTINGS = {
  bundle: true,
  sourcemap: !production,
};

/* -- Plugins */
const PLUGINS = [
  glsl({
    minify: production,
  }),
];

/* --- DEVELOPMENT */
function serveDev() {
  serve(
    {
      port: 8000,
      servedir: "dist",
    },
    {
      entryPoints: FILES.entry,
      outdir: "dist",
      ...SETTINGS,
      plugins: PLUGINS,
    }
  ).then((server) => {
    console.log(`↑DEV ↑`);
    //   server.stop();
  });
}

/* --- DEVELOPMENT */
function serveFile() {
  serve(
    {
      port: 8000,
    },
    {
      entryPoints: FILES.entry,
      outfile: "dev.js",
      ...SETTINGS,
      plugins: PLUGINS,
    }
  ).then((server) => {
    console.log(`↑FLOW`);
    //   server.stop();
  });
}

/* --- BUILD */
function buildJs() {
  build({
    entryPoints: FILES.entry,
    outdir: FILES.out,
    ...SETTINGS,
    plugins: PLUGINS,
  }).then((stats) => {
    console.log(stats);
  });
}

/* ------ Run! */
if (production) {
  buildJs();
} else if (env === "dev") {
  serveDev();
} else if (env === "flow") {
  serveFile();
}
