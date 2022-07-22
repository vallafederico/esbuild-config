import { serve, build } from "esbuild";
import { glsl } from "esbuild-plugin-glsl";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

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
      entryPoints: ["app.js"],
      outdir: "dist",
      ...SETTINGS,
      plugins: PLUGINS,
    }
  ).then((server) => {
    console.log(`DEV ↑`);
    //   server.stop();
  });
}

/* --- BUILD */
function buildJs() {
  build({
    entryPoints: ["app.js"],
    outdir: "build/js",
    ...SETTINGS,
    plugins: PLUGINS,
  }).then((stats) => {
    console.log(stats);
  });
}

/* ------ Run! */
if (production) {
  buildJs();
} else serveDev();
