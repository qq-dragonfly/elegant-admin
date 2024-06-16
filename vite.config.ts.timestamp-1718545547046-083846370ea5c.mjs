// vite.config.ts
import fs2 from "node:fs";
import path2 from "node:path";
import process3 from "node:process";
import { defineConfig, loadEnv } from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite@5.2.12_sass@1.77.4_terser@5.31.0/node_modules/vite/dist/node/index.js";
import dayjs2 from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/dayjs@1.11.11/node_modules/dayjs/dayjs.min.js";

// vite/utils.ts
import process from "node:process";
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

// vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = [], VITE_OPEN_PROXY) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: VITE_OPEN_PROXY === "true",
      // 如果环境变量 VITE_OPEN_PROXY 为 'true'，则重写路径，否则移除路径中的 '/proxy'
      rewrite: (path3) => VITE_OPEN_PROXY === "true" ? path3.replace(new RegExp(`^${prefix}`), `${prefix}`) : path3.replace(/\/proxy/, ""),
      // 如果目标地址是 HTTPS，则设置 secure 为 false
      ...isHttps ? { secure: false } : {}
    };
  }
  console.log("ret", ret);
  return ret;
}

// package.json
var package_default = {
  name: "elegant-admin",
  type: "module",
  version: "1.0.1",
  private: true,
  description: "\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF",
  author: "zhangyao <97972619@qq.com>",
  engines: {
    node: "^18.18.0 || ^20.0.0"
  },
  scripts: {
    dev: "vite dev",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pre": "vue-tsc && vite build --mode pre",
    "build:prod": "vue-tsc && vite build --mode production",
    "serve:test": "http-server ./dist -o ",
    report: "http-server ./dist -o stats.html",
    deploy: "sh deploy.sh",
    svgo: "svgo -f src/assets/icons",
    new: "plop",
    "generate:icons": "esno ./scripts/generate.icons.ts",
    lint: "npm-run-all -s lint:tsc lint:eslint lint:stylelint",
    "lint:tsc": "vue-tsc",
    "lint:eslint": "eslint . --cache --fix",
    "lint:stylelint": 'stylelint "src/**/*.{css,scss,vue}" --cache --fix',
    postinstall: "simple-git-hooks",
    preinstall: "npx only-allow pnpm",
    commit: "git pull && git add -A && git cz && git push"
  },
  dependencies: {
    "@bytemd/plugin-gfm": "^1.21.0",
    "@bytemd/vue-next": "^1.21.0",
    "@headlessui/vue": "^1.7.19",
    "@imengyu/vue3-context-menu": "^1.3.8",
    "@tinymce/tinymce-vue": "^5.1.1",
    "@vueuse/core": "^10.8.0",
    "@vueuse/integrations": "^10.8.0",
    "animate.css": "^4.1.1",
    axios: "^1.6.8",
    bytemd: "^1.21.0",
    colord: "2.9.3",
    "crypto-js": "^4.1.1",
    dayjs: "^1.11.10",
    defu: "^6.1.4",
    echarts: "^5.5.0",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.7.3",
    "floating-vue": "5.2.2",
    "hotkeys-js": "^3.13.7",
    "lodash-es": "^4.17.21",
    mitt: "^3.0.1",
    mockjs: "^1.1.0",
    "monaco-editor": "^0.48.0",
    nprogress: "^0.2.0",
    overlayscrollbars: "^2.5.0",
    "overlayscrollbars-vue": "^0.5.7",
    "path-browserify": "^1.0.1",
    "path-to-regexp": "^6.2.1",
    pinia: "^2.1.7",
    "print-js": "^1.6.0",
    qrcode: "^1.5.3",
    qs: "^6.12.1",
    scule: "^1.3.0",
    sortablejs: "1.15.2",
    splitpanes: "^3.1.5",
    swiper: "^11.0.6",
    tinymce: "^7.0.1",
    typeit: "^8.8.3",
    vconsole: "^3.15.1",
    vue: "^3.4.26",
    "vue-esign": "^1.1.4",
    "vue-i18n": "9.13.1",
    "vue-m-message": "^4.0.2",
    "vue-router": "^4.3.2",
    vuedraggable: "4.1.0",
    "xe-utils": "^3.5.20",
    xgplayer: "^3.0.17",
    "xgplayer-hls": "^3.0.17",
    xlsx: "^0.18.5"
  },
  devDependencies: {
    "@antfu/eslint-config": "2.6.4",
    "@iconify/json": "^2.2.205",
    "@iconify/vue": "^4.1.2",
    "@stylistic/stylelint-config": "^1.0.1",
    "@types/crypto-js": "^4.1.1",
    "@types/lodash-es": "^4.17.12",
    "@types/mockjs": "^1.0.10",
    "@types/nprogress": "^0.2.3",
    "@types/path-browserify": "^1.0.2",
    "@types/qrcode": "^1.5.5",
    "@types/qs": "^6.9.15",
    "@types/rollup-plugin-visualizer": "^4.2.4",
    "@types/sortablejs": "^1.15.8",
    "@types/splitpanes": "^2.2.6",
    "@unocss/eslint-plugin": "^0.59.4",
    "@vitejs/plugin-legacy": "^5.3.2",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    archiver: "^6.0.2",
    autoprefixer: "^10.4.19",
    boxen: "^7.1.1",
    "cz-git": "^1.9.1",
    eslint: "^8.57.0",
    esno: "^4.0.0",
    "fs-extra": "^11.2.0",
    "http-server": "^14.1.1",
    inquirer: "^9.2.17",
    "lint-staged": "^15.2.2",
    "npm-run-all": "^4.1.5",
    picocolors: "^1.0.0",
    plop: "^4.0.1",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.72.0",
    "simple-git-hooks": "^2.11.1",
    stylelint: "^16.3.1",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-standard-scss": "^13.0.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-scss": "^6.2.1",
    svgo: "^3.2.0",
    terser: "^5.30.4",
    typescript: "^5.4.5",
    unocss: "^0.58.5",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-turbo-console": "^1.4.0",
    "unplugin-vue-components": "^0.26.0",
    vite: "^5.2.11",
    "vite-plugin-banner": "^0.7.1",
    "vite-plugin-compression2": "^1.1.0",
    "vite-plugin-fake-server": "^2.1.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-monaco-editor": "^1.1.0",
    "vite-plugin-pages": "^0.32.1",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.1.3",
    "vite-plugin-vue-meta-layouts": "^0.4.3",
    "vue-tsc": "^2.0.16"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged",
    preserveUnused: true
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite/plugins/index.ts
import vue from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_vue@3.4.27/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_vue@3.4.27/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueLegacy from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.0_vite@5.2.12/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import monacoEditorPlugin from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-monaco-editor@1.1.0_monaco-editor@0.48.0/node_modules/vite-plugin-monaco-editor/dist/index.js";

// vite/plugins/app-info.ts
import boxen from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/boxen@7.1.1/node_modules/boxen/index.js";
import picocolors from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/picocolors@1.0.1/node_modules/picocolors/picocolors.js";
function appInfo() {
  return {
    name: "appInfo",
    apply: "serve",
    async buildStart() {
      const { bold, green, bgGreen, underline } = picocolors;
      console.log(
        boxen(
          `${bold(green(`\u7531 ${bgGreen("Elegant-admin")} \u9A71\u52A8`))}

${underline("https://github.com/zhangyao1990/elegant-admin")}`,
          {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            textAlignment: "center"
          }
        )
      );
    }
  };
}

// vite/plugins/devtools.ts
import VueDevTools from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_vite@5.2.12_vue@3.4.27/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env;
  return VITE_OPEN_DEVTOOLS === "true" && VueDevTools();
}

// vite/plugins/auto-import.ts
import autoImport from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.10.0/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia",
      "vue-i18n"
    ],
    dts: "./src/types/auto-imports.d.ts",
    dirs: [
      "./src/hooks/**"
    ]
  });
}

// vite/plugins/components.ts
import components from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.27/node_modules/unplugin-vue-components/dist/vite.js";
function createComponents() {
  return components({
    dirs: [
      "src/components",
      "src/layouts/ui-kit-components"
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/types/components.d.ts"
  });
}

// vite/plugins/unocss.ts
import Unocss from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/unocss@0.58.9_postcss@8.4.38_vite@5.2.12/node_modules/unocss/dist/vite.mjs";
function createUnocss() {
  return Unocss();
}

// vite/plugins/svg-icon.ts
import path from "node:path";
import process2 from "node:process";
import { createSvgIconsPlugin } from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.12/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process2.cwd(), "src/assets/icons/")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/mock.ts
import { vitePluginFakeServer } from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-fake-server@2.1.1/node_modules/vite-plugin-fake-server/dist/index.mjs";
function createMock(env, isBuild) {
  const { VITE_BUILD_MOCK } = env;
  return vitePluginFakeServer({
    logger: !isBuild,
    include: "src/mock",
    infixName: false,
    enableProd: isBuild && VITE_BUILD_MOCK === "true"
  });
}

// vite/plugins/layouts.ts
import Layouts from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.2.12_vue-router@4.3.2/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createLayouts() {
  return Layouts({
    defaultLayout: "index"
  });
}

// vite/plugins/compression.ts
import { compression } from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-compression2@1.1.1/node_modules/vite-plugin-compression2/dist/index.mjs";
function createCompression(env, isBuild) {
  const plugin = [];
  if (isBuild) {
    const { VITE_BUILD_COMPRESS } = env;
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression()
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          exclude: [/\.(br)$/, /\.(gz)$/],
          algorithm: "brotliCompress"
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/archiver.ts
import fs from "node:fs";
import dayjs from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/dayjs@1.11.11/node_modules/dayjs/dayjs.min.js";
import archiver from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/archiver@6.0.2/node_modules/archiver/index.js";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createArchiver(env) {
  const { VITE_BUILD_ARCHIVE } = env;
  let outDir;
  return {
    name: "vite-plugin-archiver",
    apply: "build",
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir;
    },
    async closeBundle() {
      if (["zip", "tar"].includes(VITE_BUILD_ARCHIVE)) {
        await sleep(1e3);
        const archive = archiver(VITE_BUILD_ARCHIVE, {
          ...VITE_BUILD_ARCHIVE === "zip" && { zlib: { level: 9 } },
          ...VITE_BUILD_ARCHIVE === "tar" && { gzip: true, gzipOptions: { level: 9 } }
        });
        const output = fs.createWriteStream(`${outDir}.${dayjs().format("YYYY-MM-DD-HH-mm-ss")}.${VITE_BUILD_ARCHIVE === "zip" ? "zip" : "tar.gz"}`);
        archive.pipe(output);
        archive.directory(outDir, false);
        archive.finalize();
      }
    }
  };
}

// vite/plugins/console.ts
import TurboConsole from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/unplugin-turbo-console@1.8.6_vite@5.2.12_vue@3.4.27/node_modules/unplugin-turbo-console/dist/vite.js";
function createConsole() {
  return TurboConsole();
}

// vite/plugins/banner.ts
import banner from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/vite-plugin-banner@0.7.1/node_modules/vite-plugin-banner/dist/index.mjs";
function createBanner() {
  return banner(`
/**
 * \u7531 MrZhang \u63D0\u4F9B\u6280\u672F\u652F\u6301
 * Powered by elegant-admin
 * Github https://github.com/zhangyao1990/elegant-admin
 */
`);
}

// vite/plugins/visualizer.ts
import { visualizer } from "file:///Users/zhangyao/zy_pro/pro/Admin/elegant-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function createVisualizer() {
  return visualizer({
    emitFile: true,
    filename: "stats.html",
    // 分析图生成的文件名
    open: true
    // 如果存在本地服务端口，将在打包后自动展示
  });
}

// vite/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    appInfo(),
    vue(),
    monacoEditorPlugin.default({
      languageWorkers: [
        "editorWorkerService",
        "css",
        "html",
        "json",
        "typescript"
      ]
    }),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        "es.array.at",
        "es.array.find-last"
      ]
    })
  ];
  vitePlugins.push(createDevtools(viteEnv));
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createComponents());
  vitePlugins.push(createUnocss());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(createMock(viteEnv, isBuild));
  vitePlugins.push(createLayouts());
  vitePlugins.push(...createCompression(viteEnv, isBuild));
  vitePlugins.push(createArchiver(viteEnv));
  vitePlugins.push(createConsole());
  vitePlugins.push(createBanner());
  vitePlugins.push(createVisualizer());
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "/Users/zhangyao/zy_pro/pro/Admin/elegant-admin";
var vite_config_default = async ({ mode, command }) => {
  const env = loadEnv(mode, process3.cwd());
  const viteEnv = wrapperEnv(env);
  const { VITE_PROXY, VITE_OPEN_PROXY } = viteEnv;
  const isBuild = command === "build";
  const scssResources = [];
  fs2.readdirSync("src/assets/styles/resources").forEach((dirname) => {
    if (fs2.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`);
    }
  });
  return defineConfig({
    base: "./",
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      port: 5858,
      host: "0.0.0.0",
      proxy: createProxy(VITE_PROXY, VITE_OPEN_PROXY)
    },
    build: {
      outDir: "dist",
      // 相对于根目录的构建输出位置。如果目录存在，则将在构建之前删除该目录。
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      minify: "esbuild",
      // 混淆器，terser 构建后文件体积更小，'boolean' | 'terser' | 'esbuild'
      reportCompressedSize: true,
      // 规定触发警告的 chunk 大小.默认500
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4e3,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups.moduleName ?? "vender";
            }
          }
        }
      }
    },
    esbuild: {
      // 清除全局的console.log和debug
      drop: isBuild ? ["console", "debugger"] : []
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          dependencies: package_default.dependencies,
          devDependencies: package_default.devDependencies
        },
        lastBuildTime: dayjs2().format("YYYY-MM-DD HH:mm:ss")
      })
    },
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "src"),
        "#": path2.resolve(__vite_injected_original_dirname, "src/types")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join("")
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS91dGlscy50cyIsICJ2aXRlL3Byb3h5LnRzIiwgInBhY2thZ2UuanNvbiIsICJ2aXRlL3BsdWdpbnMvaW5kZXgudHMiLCAidml0ZS9wbHVnaW5zL2FwcC1pbmZvLnRzIiwgInZpdGUvcGx1Z2lucy9kZXZ0b29scy50cyIsICJ2aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHMiLCAidml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHMiLCAidml0ZS9wbHVnaW5zL3Vub2Nzcy50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL21vY2sudHMiLCAidml0ZS9wbHVnaW5zL2xheW91dHMudHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9hcmNoaXZlci50cyIsICJ2aXRlL3BsdWdpbnMvY29uc29sZS50cyIsICJ2aXRlL3BsdWdpbnMvYmFubmVyLnRzIiwgInZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7LypcbiAqICAgICAgICAgICAgICAgICAgIFx1NkM1Rlx1NTdDRVx1NUI1MCAuIFx1N0EwQlx1NUU4Rlx1NTQ1OFx1NEU0Qlx1NkI0Q1xuICpcbiAqICAgICAgICAgICAgICAgXHU1MzQxXHU1RTc0XHU3NTFGXHU2QjdCXHU0RTI0XHU4MzJCXHU4MzJCXHVGRjBDXHU1MTk5XHU3QTBCXHU1RThGXHVGRjBDXHU1MjMwXHU1OTI5XHU0RUFFXHUzMDAyXG4gKiAgICAgICAgICAgICAgICAgICBcdTUzNDNcdTg4NENcdTRFRTNcdTc4MDFcdUZGMENCdWdcdTRGNTVcdTU5MDRcdTg1Q0ZcdTMwMDJcbiAqICAgICAgICAgICAgICAgXHU3RUI1XHU0RjdGXHU0RTBBXHU3RUJGXHU1M0M4XHU2MDBFXHU2ODM3XHVGRjBDXHU2NzFEXHU0RUU0XHU2NTM5XHVGRjBDXHU1OTE1XHU2NUFEXHU4MEEwXHUzMDAyXG4gKlxuICogICAgICAgICAgICAgICBcdTk4ODZcdTVCRkNcdTZCQ0ZcdTU5MjlcdTY1QjBcdTYwRjNcdTZDRDVcdUZGMENcdTU5MjlcdTU5MjlcdTY1MzlcdUZGMENcdTY1RTVcdTY1RTVcdTVGRDlcdTMwMDJcbiAqICAgICAgICAgICAgICAgICAgIFx1NzZGOFx1OTg3RVx1NjVFMFx1OEEwMFx1RkYwQ1x1NjBERlx1NjcwOVx1NkNFQVx1NTM0M1x1ODg0Q1x1MzAwMlxuICogICAgICAgICAgICAgICBcdTZCQ0ZcdTY2NUFcdTcwNkZcdTcwNkJcdTk2MTFcdTczQ0FcdTU5MDRcdUZGMENcdTU5MUNcdTk2QkVcdTVCRDBcdUZGMENcdTUyQTBcdTczRURcdTcyQzJcdTMwMDJcbiAqXG4gKlxuICogQERlc2NyaXB0aW9uOnZpdGUuY29uZmlnLmpzXHU5MTREXHU3RjZFXG4gKiBAdmVyc2lvbjpcbiAqIEBEYXRlOiAyMDIzLTAyLTExXG4gKiBATGFzdEVkaXRvcnM6ICA5Nzk3MjYxOUBxcS5jb21cbiAqIEBMYXN0RWRpdFRpbWU6XG4gKiBAQXV0aG9yOiA5Nzk3MjYxOUBxcS5jb21cbiAqL1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gJy4vdml0ZS91dGlscydcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi92aXRlL3Byb3h5J1xuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcbmltcG9ydCBjcmVhdGVWaXRlUGx1Z2lucyBmcm9tICcuL3ZpdGUvcGx1Z2lucydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudilcblxuICBjb25zdCB7IFZJVEVfUFJPWFksIFZJVEVfT1BFTl9QUk9YWSB9ID0gdml0ZUVudlxuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJ1xuICAvLyBcdTUxNjhcdTVDNDAgc2NzcyBcdThENDRcdTZFOTBcbiAgY29uc3Qgc2Nzc1Jlc291cmNlcyA9IFtdXG4gIGZzLnJlYWRkaXJTeW5jKCdzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMnKS5mb3JFYWNoKChkaXJuYW1lKSA9PiB7XG4gICAgaWYgKGZzLnN0YXRTeW5jKGBzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfWApLmlzRmlsZSgpKSB7XG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goYEB1c2UgXCJzcmMvYXNzZXRzL3N0eWxlcy9yZXNvdXJjZXMvJHtkaXJuYW1lfVwiIGFzICo7YClcbiAgICB9XG4gIH0pXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGJhc2U6ICcuLycsXG4gICAgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MDA5XHU5ODc5IGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3NlcnZlci1vcHRpb25zXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1ODU4LFxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KFZJVEVfUFJPWFksIFZJVEVfT1BFTl9QUk9YWSksXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnZGlzdCcsIC8vIFx1NzZGOFx1NUJGOVx1NEU4RVx1NjgzOVx1NzZFRVx1NUY1NVx1NzY4NFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NEY0RFx1N0Y2RVx1MzAwMlx1NTk4Mlx1Njc5Q1x1NzZFRVx1NUY1NVx1NUI1OFx1NTcyOFx1RkYwQ1x1NTIxOVx1NUMwNlx1NTcyOFx1Njc4NFx1NUVGQVx1NEU0Qlx1NTI0RFx1NTIyMFx1OTY2NFx1OEJFNVx1NzZFRVx1NUY1NVx1MzAwMlxuICAgICAgc291cmNlbWFwOiBlbnYuVklURV9CVUlMRF9TT1VSQ0VNQVAgPT09ICd0cnVlJyxcbiAgICAgIG1pbmlmeTogJ2VzYnVpbGQnLCAvLyBcdTZERjdcdTZEQzZcdTU2NjhcdUZGMEN0ZXJzZXIgXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NTg3XHU0RUY2XHU0RjUzXHU3OUVGXHU2NkY0XHU1QzBGXHVGRjBDJ2Jvb2xlYW4nIHwgJ3RlcnNlcicgfCAnZXNidWlsZCdcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgICAgLy8gXHU4OUM0XHU1QjlBXHU4OUU2XHU1M0QxXHU4QjY2XHU1NDRBXHU3Njg0IGNodW5rIFx1NTkyN1x1NUMwRi5cdTlFRDhcdThCQTQ1MDBcbiAgICAgIC8vIFx1NkQ4OFx1OTY2NFx1NjI1M1x1NTMwNVx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNzUwMGtiXHU4QjY2XHU1NDRBXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDQwMDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTIwNlx1N0M3Qlx1NjI1M1x1NTMwNVxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkubWF0Y2goL1xcL25vZGVfbW9kdWxlc1xcLyg/IS5wbnBtKSg/PG1vZHVsZU5hbWU+W15cXC9dKilcXC8vKT8uZ3JvdXBzIS5tb2R1bGVOYW1lID8/ICd2ZW5kZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICAvLyBcdTZFMDVcdTk2NjRcdTUxNjhcdTVDNDBcdTc2ODRjb25zb2xlLmxvZ1x1NTQ4Q2RlYnVnXG4gICAgICBkcm9wOiBpc0J1aWxkID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbXSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgX19TWVNURU1fSU5GT19fOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHBrZzoge1xuICAgICAgICAgIGRlcGVuZGVuY2llczogcGtnLmRlcGVuZGVuY2llcyxcbiAgICAgICAgICBkZXZEZXBlbmRlbmNpZXM6IHBrZy5kZXZEZXBlbmRlbmNpZXMsXG4gICAgICAgIH0sXG4gICAgICAgIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG4gICAgICB9KSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKGVudiwgY29tbWFuZCA9PT0gJ2J1aWxkJyksXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICcjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy90eXBlcycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IHNjc3NSZXNvdXJjZXMuam9pbignJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS91dGlscy50c1wiO2ltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcblxuLyoqXG4gKiBcdTVDMDZcdTczQUZcdTU4ODNcdTkxNERcdTdGNkVcdTRGRTFcdTYwNkZcdTUzMDVcdTg4QzVcdTVFNzZcdTZDRThcdTUxNjVcdTUyMzBcdThGREJcdTdBMEJcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTRFMkRcdTMwMDJcbiAqIEBwYXJhbSBlbnZDb25mIFx1NzNBRlx1NTg4M1x1OTE0RFx1N0Y2RVx1NUJGOVx1OEM2MVx1RkYwQ1x1OTUyRVx1NEUzQVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NTQwRFx1RkYwQ1x1NTAzQ1x1NEUzQVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NzY4NFx1NUI1N1x1N0IyNlx1NEUzMlx1NTAzQ1x1MzAwMlxuICogQHJldHVybnMgXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU1QkY5XHU4QzYxXHVGRjBDXHU1MTc2XHU0RTJEXHU1MzA1XHU1NDJCXHU3RUNGXHU4RkM3XHU1OTA0XHU3NDA2XHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IGFueSkge1xuICBjb25zdCByZXQ6IGFueSA9IHt9XG5cbiAgLy8gXHU5MDREXHU1Mzg2XHU3M0FGXHU1ODgzXHU5MTREXHU3RjZFXHU1QkY5XHU4QzYxXHVGRjBDXHU1QkY5XHU2QkNGXHU0RTJBXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU4RkRCXHU4ODRDXHU1OTA0XHU3NDA2XG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIC8vIFx1NjZGRlx1NjM2Mlx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NTAzQ1x1NEUyRFx1NzY4NFx1NjM2Mlx1ODg0Q1x1N0IyNlx1RkYwQ1x1NUU3Nlx1NTkwNFx1NzQwNlx1NUUwM1x1NUMxNFx1NTAzQ1x1NUI1N1x1N0IyNlx1NEUzMlxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHJlYWxOYW1lID09PSAnZmFsc2UnID8gZmFsc2UgOiByZWFsTmFtZVxuXG4gICAgLy8gXHU1OTgyXHU2NzlDXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU1NDBEXHU0RTNBJ1ZJVEVfUFJPWFknXHU0RTE0XHU1MTc2XHU1MDNDXHU0RTBEXHU0RTNBXHU3QTdBXHVGRjBDXHU1MjE5XHU1QzFEXHU4QkQ1XHU1QzA2XHU1MTc2XHU4OUUzXHU2NzkwXHU0RTNBSlNPTlxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScgJiYgcmVhbE5hbWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKVxuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlYWxOYW1lID0gJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdTVDMDZcdTU5MDRcdTc0MDZcdTU0MEVcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTUwM0NcdTVCNThcdTUxNjVcdThGRDRcdTU2REVcdTVCRjlcdThDNjFcdUZGMENcdTVFNzZcdTY4MzlcdTYzNkVcdTUwM0NcdTc2ODRcdTdDN0JcdTU3OEJcdTZDRThcdTUxNjVcdTUyMzBcdThGREJcdTdBMEJcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTRFMkRcbiAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZVxuICAgIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IHJlYWxOYW1lXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdID0gSlNPTi5zdHJpbmdpZnkocmVhbE5hbWUpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXRcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ11cblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXVxuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cblxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvL1xuXG4vKipcbiAqIFx1NTIxQlx1NUVGQVx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVx1NUJGOVx1OEM2MVxuICogQHBhcmFtIGxpc3QgXHU0RUUzXHU3NDA2XHU1MjE3XHU4ODY4XHVGRjBDXHU2NjJGXHU0RTAwXHU0RTJBXHU5NTJFXHU0RTNBXHU1MjREXHU3RjAwXHUzMDAxXHU1MDNDXHU0RTNBXHU3NkVFXHU2ODA3XHU1NzMwXHU1NzQwXHU3Njg0XHU5NTJFXHU1MDNDXHU1QkY5XHU2NTcwXHU3RUM0XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBXHU3QTdBXHU2NTcwXHU3RUM0XG4gKiBAcGFyYW0gVklURV9PUEVOX1BST1hZIFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1RkYwQ1x1NzUyOFx1NEU4RVx1NjNBN1x1NTIzNlx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NEVFM1x1NzQwNlx1RkYwQ1x1NUI1N1x1N0IyNlx1NEUzMlx1NTAzQ1x1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQVx1NUI1N1x1N0IyNlx1NEUzMlx1NUY2Mlx1NUYwRlx1NzY4NCAndHJ1ZScgXHU2MjE2XHU1MTc2XHU0RUQ2XHU5NzVFICd0cnVlJyBcdTUwM0NcbiAqIEByZXR1cm5zIFx1OEZENFx1NTZERVx1NEUwMFx1NEUyQVx1NUJGOVx1OEM2MVx1RkYwQ1x1OTUyRVx1NEUzQVx1NTI0RFx1N0YwMFx1RkYwQ1x1NTAzQ1x1NEUzQVx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVx1NUJGOVx1OEM2MVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10sIFZJVEVfT1BFTl9QUk9YWTogc3RyaW5nKSB7XG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge31cbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldClcbiAgICAvLyBcdTY4MzlcdTYzNkVcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTU3MzBcdTU3NDBcdTkxNERcdTdGNkVcdTRFRTNcdTc0MDZcdTkwMDlcdTk4NzlcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIGNoYW5nZU9yaWdpbjogVklURV9PUEVOX1BST1hZID09PSAndHJ1ZScsXG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0YgVklURV9PUEVOX1BST1hZIFx1NEUzQSAndHJ1ZSdcdUZGMENcdTUyMTlcdTkxQ0RcdTUxOTlcdThERUZcdTVGODRcdUZGMENcdTU0MjZcdTUyMTlcdTc5RkJcdTk2NjRcdThERUZcdTVGODRcdTRFMkRcdTc2ODQgJy9wcm94eSdcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gVklURV9PUEVOX1BST1hZID09PSAndHJ1ZScgPyBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCBgJHtwcmVmaXh9YCkgOiBwYXRoLnJlcGxhY2UoL1xcL3Byb3h5LywgJycpLFxuICAgICAgLy8gXHU1OTgyXHU2NzlDXHU3NkVFXHU2ODA3XHU1NzMwXHU1NzQwXHU2NjJGIEhUVFBTXHVGRjBDXHU1MjE5XHU4QkJFXHU3RjZFIHNlY3VyZSBcdTRFM0EgZmFsc2VcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSksXG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdyZXQnLCByZXQpXG4gIHJldHVybiByZXRcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcImVsZWdhbnQtYWRtaW5cIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMC4xXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiXHU1NDBFXHU1M0YwXHU3QkExXHU3NDA2XHU3Q0ZCXHU3RURGXCIsXG4gIFwiYXV0aG9yXCI6IFwiemhhbmd5YW8gPDk3OTcyNjE5QHFxLmNvbT5cIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTguMCB8fCBeMjAuMC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGUgZGV2XCIsXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXG4gICAgXCJidWlsZDpwcmVcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHByZVwiLFxuICAgIFwiYnVpbGQ6cHJvZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZHVjdGlvblwiLFxuICAgIFwic2VydmU6dGVzdFwiOiBcImh0dHAtc2VydmVyIC4vZGlzdCAtbyBcIixcbiAgICBcInJlcG9ydFwiOiBcImh0dHAtc2VydmVyIC4vZGlzdCAtbyBzdGF0cy5odG1sXCIsXG4gICAgXCJkZXBsb3lcIjogXCJzaCBkZXBsb3kuc2hcIixcbiAgICBcInN2Z29cIjogXCJzdmdvIC1mIHNyYy9hc3NldHMvaWNvbnNcIixcbiAgICBcIm5ld1wiOiBcInBsb3BcIixcbiAgICBcImdlbmVyYXRlOmljb25zXCI6IFwiZXNubyAuL3NjcmlwdHMvZ2VuZXJhdGUuaWNvbnMudHNcIixcbiAgICBcImxpbnRcIjogXCJucG0tcnVuLWFsbCAtcyBsaW50OnRzYyBsaW50OmVzbGludCBsaW50OnN0eWxlbGludFwiLFxuICAgIFwibGludDp0c2NcIjogXCJ2dWUtdHNjXCIsXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludCAuIC0tY2FjaGUgLS1maXhcIixcbiAgICBcImxpbnQ6c3R5bGVsaW50XCI6IFwic3R5bGVsaW50IFxcXCJzcmMvKiovKi57Y3NzLHNjc3MsdnVlfVxcXCIgLS1jYWNoZSAtLWZpeFwiLFxuICAgIFwicG9zdGluc3RhbGxcIjogXCJzaW1wbGUtZ2l0LWhvb2tzXCIsXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwiY29tbWl0XCI6IFwiZ2l0IHB1bGwgJiYgZ2l0IGFkZCAtQSAmJiBnaXQgY3ogJiYgZ2l0IHB1c2hcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYnl0ZW1kL3BsdWdpbi1nZm1cIjogXCJeMS4yMS4wXCIsXG4gICAgXCJAYnl0ZW1kL3Z1ZS1uZXh0XCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiQGhlYWRsZXNzdWkvdnVlXCI6IFwiXjEuNy4xOVwiLFxuICAgIFwiQGltZW5neXUvdnVlMy1jb250ZXh0LW1lbnVcIjogXCJeMS4zLjhcIixcbiAgICBcIkB0aW55bWNlL3RpbnltY2UtdnVlXCI6IFwiXjUuMS4xXCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuOC4wXCIsXG4gICAgXCJAdnVldXNlL2ludGVncmF0aW9uc1wiOiBcIl4xMC44LjBcIixcbiAgICBcImFuaW1hdGUuY3NzXCI6IFwiXjQuMS4xXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuOFwiLFxuICAgIFwiYnl0ZW1kXCI6IFwiXjEuMjEuMFwiLFxuICAgIFwiY29sb3JkXCI6IFwiMi45LjNcIixcbiAgICBcImNyeXB0by1qc1wiOiBcIl40LjEuMVwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMFwiLFxuICAgIFwiZGVmdVwiOiBcIl42LjEuNFwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMFwiLFxuICAgIFwiZWNoYXJ0cy1saXF1aWRmaWxsXCI6IFwiXjMuMS4wXCIsXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi43LjNcIixcbiAgICBcImZsb2F0aW5nLXZ1ZVwiOiBcIjUuMi4yXCIsXG4gICAgXCJob3RrZXlzLWpzXCI6IFwiXjMuMTMuN1wiLFxuICAgIFwibG9kYXNoLWVzXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxuICAgIFwibW9uYWNvLWVkaXRvclwiOiBcIl4wLjQ4LjBcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwib3ZlcmxheXNjcm9sbGJhcnNcIjogXCJeMi41LjBcIixcbiAgICBcIm92ZXJsYXlzY3JvbGxiYXJzLXZ1ZVwiOiBcIl4wLjUuN1wiLFxuICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl42LjIuMVwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInByaW50LWpzXCI6IFwiXjEuNi4wXCIsXG4gICAgXCJxcmNvZGVcIjogXCJeMS41LjNcIixcbiAgICBcInFzXCI6IFwiXjYuMTIuMVwiLFxuICAgIFwic2N1bGVcIjogXCJeMS4zLjBcIixcbiAgICBcInNvcnRhYmxlanNcIjogXCIxLjE1LjJcIixcbiAgICBcInNwbGl0cGFuZXNcIjogXCJeMy4xLjVcIixcbiAgICBcInN3aXBlclwiOiBcIl4xMS4wLjZcIixcbiAgICBcInRpbnltY2VcIjogXCJeNy4wLjFcIixcbiAgICBcInR5cGVpdFwiOiBcIl44LjguM1wiLFxuICAgIFwidmNvbnNvbGVcIjogXCJeMy4xNS4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjI2XCIsXG4gICAgXCJ2dWUtZXNpZ25cIjogXCJeMS4xLjRcIixcbiAgICBcInZ1ZS1pMThuXCI6IFwiOS4xMy4xXCIsXG4gICAgXCJ2dWUtbS1tZXNzYWdlXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMy4yXCIsXG4gICAgXCJ2dWVkcmFnZ2FibGVcIjogXCI0LjEuMFwiLFxuICAgIFwieGUtdXRpbHNcIjogXCJeMy41LjIwXCIsXG4gICAgXCJ4Z3BsYXllclwiOiBcIl4zLjAuMTdcIixcbiAgICBcInhncGxheWVyLWhsc1wiOiBcIl4zLjAuMTdcIixcbiAgICBcInhsc3hcIjogXCJeMC4xOC41XCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCIyLjYuNFwiLFxuICAgIFwiQGljb25pZnkvanNvblwiOiBcIl4yLjIuMjA1XCIsXG4gICAgXCJAaWNvbmlmeS92dWVcIjogXCJeNC4xLjJcIixcbiAgICBcIkBzdHlsaXN0aWMvc3R5bGVsaW50LWNvbmZpZ1wiOiBcIl4xLjAuMVwiLFxuICAgIFwiQHR5cGVzL2NyeXB0by1qc1wiOiBcIl40LjEuMVwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaC1lc1wiOiBcIl40LjE3LjEyXCIsXG4gICAgXCJAdHlwZXMvbW9ja2pzXCI6IFwiXjEuMC4xMFwiLFxuICAgIFwiQHR5cGVzL25wcm9ncmVzc1wiOiBcIl4wLjIuM1wiLFxuICAgIFwiQHR5cGVzL3BhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMlwiLFxuICAgIFwiQHR5cGVzL3FyY29kZVwiOiBcIl4xLjUuNVwiLFxuICAgIFwiQHR5cGVzL3FzXCI6IFwiXjYuOS4xNVwiLFxuICAgIFwiQHR5cGVzL3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl40LjIuNFwiLFxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS44XCIsXG4gICAgXCJAdHlwZXMvc3BsaXRwYW5lc1wiOiBcIl4yLjIuNlwiLFxuICAgIFwiQHVub2Nzcy9lc2xpbnQtcGx1Z2luXCI6IFwiXjAuNTkuNFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI6IFwiXjUuMy4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4xLjBcIixcbiAgICBcImFyY2hpdmVyXCI6IFwiXjYuMC4yXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiYm94ZW5cIjogXCJeNy4xLjFcIixcbiAgICBcImN6LWdpdFwiOiBcIl4xLjkuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNub1wiOiBcIl40LjAuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJodHRwLXNlcnZlclwiOiBcIl4xNC4xLjFcIixcbiAgICBcImlucXVpcmVyXCI6IFwiXjkuMi4xN1wiLFxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuMi4yXCIsXG4gICAgXCJucG0tcnVuLWFsbFwiOiBcIl40LjEuNVwiLFxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjAuMFwiLFxuICAgIFwicGxvcFwiOiBcIl40LjAuMVwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI6IFwiXjUuMTIuMFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjcyLjBcIixcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMS4xXCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMy4xXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY2Vzcy1vcmRlclwiOiBcIl41LjAuMVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjEzLjAuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC12dWVcIjogXCJeMS4wLjBcIixcbiAgICBcInN0eWxlbGludC1zY3NzXCI6IFwiXjYuMi4xXCIsXG4gICAgXCJzdmdvXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJ0ZXJzZXJcIjogXCJeNS4zMC40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC41XCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC41XCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjVcIixcbiAgICBcInVucGx1Z2luLXR1cmJvLWNvbnNvbGVcIjogXCJeMS40LjBcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjYuMFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjIuMTFcIixcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1mYWtlLXNlcnZlclwiOiBcIl4yLjEuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvclwiOiBcIl4xLjEuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tcGFnZXNcIjogXCJeMC4zMi4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiOiBcIl43LjEuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tdnVlLW1ldGEtbGF5b3V0c1wiOiBcIl4wLjQuM1wiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4yLjAuMTZcIlxuICB9LFxuICBcInNpbXBsZS1naXQtaG9va3NcIjoge1xuICAgIFwicHJlLWNvbW1pdFwiOiBcInBucG0gbGludC1zdGFnZWRcIixcbiAgICBcInByZXNlcnZlVW51c2VkXCI6IHRydWVcbiAgfSxcbiAgXCJjb25maWdcIjoge1xuICAgIFwiY29tbWl0aXplblwiOiB7XG4gICAgICBcInBhdGhcIjogXCJub2RlX21vZHVsZXMvY3otZ2l0XCJcbiAgICB9XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgdnVlTGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcbmltcG9ydCBtb25hY29FZGl0b3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvcidcblxuaW1wb3J0IGFwcEluZm8gZnJvbSAnLi9hcHAtaW5mbydcbmltcG9ydCBjcmVhdGVEZXZ0b29scyBmcm9tICcuL2RldnRvb2xzJ1xuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcbmltcG9ydCBjcmVhdGVDb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cydcbmltcG9ydCBjcmVhdGVVbm9jc3MgZnJvbSAnLi91bm9jc3MnXG5pbXBvcnQgY3JlYXRlU3ZnSWNvbiBmcm9tICcuL3N2Zy1pY29uJ1xuaW1wb3J0IGNyZWF0ZU1vY2sgZnJvbSAnLi9tb2NrJ1xuaW1wb3J0IGNyZWF0ZUxheW91dHMgZnJvbSAnLi9sYXlvdXRzJ1xuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXG5pbXBvcnQgY3JlYXRlQXJjaGl2ZXIgZnJvbSAnLi9hcmNoaXZlcidcbmltcG9ydCBjcmVhdGVDb25zb2xlIGZyb20gJy4vY29uc29sZSdcbmltcG9ydCBjcmVhdGVCYW5uZXIgZnJvbSAnLi9iYW5uZXInXG5pbXBvcnQgY3JlYXRlVmlzdWFsaXplciBmcm9tICcuL3Zpc3VhbGl6ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQgPSBmYWxzZSkge1xuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xuICAgIGFwcEluZm8oKSxcbiAgICB2dWUoKSxcbiAgICAobW9uYWNvRWRpdG9yUGx1Z2luIGFzIGFueSkuZGVmYXVsdCh7XG4gICAgICBsYW5ndWFnZVdvcmtlcnM6IFtcbiAgICAgICAgJ2VkaXRvcldvcmtlclNlcnZpY2UnLFxuICAgICAgICAnY3NzJyxcbiAgICAgICAgJ2h0bWwnLFxuICAgICAgICAnanNvbicsXG4gICAgICAgICd0eXBlc2NyaXB0JyxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgdnVlSnN4KCksXG4gICAgdnVlTGVnYWN5KHtcbiAgICAgIHJlbmRlckxlZ2FjeUNodW5rczogZmFsc2UsXG4gICAgICBtb2Rlcm5Qb2x5ZmlsbHM6IFtcbiAgICAgICAgJ2VzLmFycmF5LmF0JyxcbiAgICAgICAgJ2VzLmFycmF5LmZpbmQtbGFzdCcsXG4gICAgICBdLFxuICAgIH0pLFxuICBdXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlRGV2dG9vbHModml0ZUVudikpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlQXV0b0ltcG9ydCgpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbXBvbmVudHMoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVVbm9jc3MoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTdmdJY29uKGlzQnVpbGQpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZU1vY2sodml0ZUVudiwgaXNCdWlsZCkpXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlTGF5b3V0cygpKVxuICB2aXRlUGx1Z2lucy5wdXNoKC4uLmNyZWF0ZUNvbXByZXNzaW9uKHZpdGVFbnYsIGlzQnVpbGQpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUFyY2hpdmVyKHZpdGVFbnYpKVxuICB2aXRlUGx1Z2lucy5wdXNoKGNyZWF0ZUNvbnNvbGUoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVCYW5uZXIoKSlcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVWaXN1YWxpemVyKCkgYXMgYW55KVxuICByZXR1cm4gdml0ZVBsdWdpbnNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2FwcC1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2FwcC1pbmZvLnRzXCI7aW1wb3J0IGJveGVuIGZyb20gJ2JveGVuJ1xuaW1wb3J0IHBpY29jb2xvcnMgZnJvbSAncGljb2NvbG9ycydcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwSW5mbygpOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdhcHBJbmZvJyxcbiAgICBhcHBseTogJ3NlcnZlJyxcbiAgICBhc3luYyBidWlsZFN0YXJ0KCkge1xuICAgICAgY29uc3QgeyBib2xkLCBncmVlbiwgYmdHcmVlbiwgdW5kZXJsaW5lIH0gPSBwaWNvY29sb3JzXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYm94ZW4oXG4gICAgICAgICAgYCR7Ym9sZChncmVlbihgXHU3NTMxICR7YmdHcmVlbignRWxlZ2FudC1hZG1pbicpfSBcdTlBNzFcdTUyQThgKSl9XFxuXFxuJHt1bmRlcmxpbmUoJ2h0dHBzOi8vZ2l0aHViLmNvbS96aGFuZ3lhbzE5OTAvZWxlZ2FudC1hZG1pbicpfWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGFkZGluZzogMSxcbiAgICAgICAgICAgIG1hcmdpbjogMSxcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnZG91YmxlJyxcbiAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIH0sXG4gICAgICAgICksXG4gICAgICApXG4gICAgfSxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvZGV2dG9vbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvZGV2dG9vbHMudHNcIjtpbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEZXZ0b29scyhlbnYpIHtcbiAgY29uc3QgeyBWSVRFX09QRU5fREVWVE9PTFMgfSA9IGVudlxuICByZXR1cm4gVklURV9PUEVOX0RFVlRPT0xTID09PSAndHJ1ZScgJiYgVnVlRGV2VG9vbHMoKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBdXRvSW1wb3J0KCkge1xuICByZXR1cm4gYXV0b0ltcG9ydCh7XG4gICAgaW1wb3J0czogW1xuICAgICAgJ3Z1ZScsXG4gICAgICAndnVlLXJvdXRlcicsXG4gICAgICAncGluaWEnLFxuICAgICAgJ3Z1ZS1pMThuJyxcbiAgICBdLFxuICAgIGR0czogJy4vc3JjL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICBkaXJzOiBbXG4gICAgICAnLi9zcmMvaG9va3MvKionLFxuICAgIF0sXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9jb21wb25lbnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnRzKCkge1xuICByZXR1cm4gY29tcG9uZW50cyh7XG4gICAgZGlyczogW1xuICAgICAgJ3NyYy9jb21wb25lbnRzJyxcbiAgICAgICdzcmMvbGF5b3V0cy91aS1raXQtY29tcG9uZW50cycsXG4gICAgXSxcbiAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLnRzeCQvXSxcbiAgICBkdHM6ICcuL3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvdW5vY3NzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL3Vub2Nzcy50c1wiO2ltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVub2NzcygpIHtcbiAgcmV0dXJuIFVub2NzcygpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9zdmctaWNvbi50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2VzcydcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdmdJY29uKGlzQnVpbGQpIHtcbiAgcmV0dXJuIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucy8nKV0sXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsXG4gIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9tb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL21vY2sudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luRmFrZVNlcnZlciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZha2Utc2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNb2NrKGVudiwgaXNCdWlsZCkge1xuICBjb25zdCB7IFZJVEVfQlVJTERfTU9DSyB9ID0gZW52XG4gIHJldHVybiB2aXRlUGx1Z2luRmFrZVNlcnZlcih7XG4gICAgbG9nZ2VyOiAhaXNCdWlsZCxcbiAgICBpbmNsdWRlOiAnc3JjL21vY2snLFxuICAgIGluZml4TmFtZTogZmFsc2UsXG4gICAgZW5hYmxlUHJvZDogaXNCdWlsZCAmJiBWSVRFX0JVSUxEX01PQ0sgPT09ICd0cnVlJyxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2xheW91dHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvbGF5b3V0cy50c1wiO2ltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUxheW91dHMoKSB7XG4gIHJldHVybiBMYXlvdXRzKHtcbiAgICBkZWZhdWx0TGF5b3V0OiAnaW5kZXgnLFxuICB9KVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvY29tcHJlc3Npb24udHNcIjtpbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ29tcHJlc3Npb24oZW52LCBpc0J1aWxkKSB7XG4gIGNvbnN0IHBsdWdpbjogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW11cbiAgaWYgKGlzQnVpbGQpIHtcbiAgICBjb25zdCB7IFZJVEVfQlVJTERfQ09NUFJFU1MgfSA9IGVudlxuICAgIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoJywnKVxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2d6aXAnKSkge1xuICAgICAgcGx1Z2luLnB1c2goXG4gICAgICAgIGNvbXByZXNzaW9uKCksXG4gICAgICApXG4gICAgfVxuICAgIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoJ2Jyb3RsaScpKSB7XG4gICAgICBwbHVnaW4ucHVzaChcbiAgICAgICAgY29tcHJlc3Npb24oe1xuICAgICAgICAgIGV4Y2x1ZGU6IFsvXFwuKGJyKSQvLCAvXFwuKGd6KSQvXSxcbiAgICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcGx1Z2luXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9hcmNoaXZlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9hcmNoaXZlci50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IGFyY2hpdmVyIGZyb20gJ2FyY2hpdmVyJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuXG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXJjaGl2ZXIoZW52KTogUGx1Z2luIHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0FSQ0hJVkUgfSA9IGVudlxuICBsZXQgb3V0RGlyOiBzdHJpbmdcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tYXJjaGl2ZXInLFxuICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XG4gICAgICBvdXREaXIgPSByZXNvbHZlZENvbmZpZy5idWlsZC5vdXREaXJcbiAgICB9LFxuICAgIGFzeW5jIGNsb3NlQnVuZGxlKCkge1xuICAgICAgaWYgKFsnemlwJywgJ3RhciddLmluY2x1ZGVzKFZJVEVfQlVJTERfQVJDSElWRSkpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMClcbiAgICAgICAgY29uc3QgYXJjaGl2ZSA9IGFyY2hpdmVyKFZJVEVfQlVJTERfQVJDSElWRSwge1xuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd6aXAnICYmIHsgemxpYjogeyBsZXZlbDogOSB9IH0pLFxuICAgICAgICAgIC4uLihWSVRFX0JVSUxEX0FSQ0hJVkUgPT09ICd0YXInICYmIHsgZ3ppcDogdHJ1ZSwgZ3ppcE9wdGlvbnM6IHsgbGV2ZWw6IDkgfSB9KSxcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oYCR7b3V0RGlyfS4ke2RheWpzKCkuZm9ybWF0KCdZWVlZLU1NLURELUhILW1tLXNzJyl9LiR7VklURV9CVUlMRF9BUkNISVZFID09PSAnemlwJyA/ICd6aXAnIDogJ3Rhci5neid9YClcbiAgICAgICAgYXJjaGl2ZS5waXBlKG91dHB1dClcbiAgICAgICAgYXJjaGl2ZS5kaXJlY3Rvcnkob3V0RGlyLCBmYWxzZSlcbiAgICAgICAgYXJjaGl2ZS5maW5hbGl6ZSgpXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvY29uc29sZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy9jb25zb2xlLnRzXCI7aW1wb3J0IFR1cmJvQ29uc29sZSBmcm9tICd1bnBsdWdpbi10dXJiby1jb25zb2xlL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbnNvbGUoKSB7XG4gIHJldHVybiBUdXJib0NvbnNvbGUoKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvYmFubmVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ3lhby96eV9wcm8vcHJvL0FkbWluL2VsZWdhbnQtYWRtaW4vdml0ZS9wbHVnaW5zL2Jhbm5lci50c1wiO2ltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVCYW5uZXIoKSB7XG4gIHJldHVybiBiYW5uZXIoYFxuLyoqXG4gKiBcdTc1MzEgTXJaaGFuZyBcdTYzRDBcdTRGOUJcdTYyODBcdTY3MkZcdTY1MkZcdTYzMDFcbiAqIFBvd2VyZWQgYnkgZWxlZ2FudC1hZG1pblxuICogR2l0aHViIGh0dHBzOi8vZ2l0aHViLmNvbS96aGFuZ3lhbzE5OTAvZWxlZ2FudC1hZG1pblxuICovXG5gKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5neWFvL3p5X3Byby9wcm8vQWRtaW4vZWxlZ2FudC1hZG1pbi92aXRlL3BsdWdpbnMvdmlzdWFsaXplci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmd5YW8venlfcHJvL3Byby9BZG1pbi9lbGVnYW50LWFkbWluL3ZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzXCI7aW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcblxuLy8gXHU0RjlEXHU4RDU2XHU1MjA2XHU2NzkwXHU2M0QyXHU0RUY2XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVWaXN1YWxpemVyKCkge1xuICByZXR1cm4gdmlzdWFsaXplcih7XG4gICAgZW1pdEZpbGU6IHRydWUsXG4gICAgZmlsZW5hbWU6ICdzdGF0cy5odG1sJywgLy8gXHU1MjA2XHU2NzkwXHU1NkZFXHU3NTFGXHU2MjEwXHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXG4gICAgb3BlbjogdHJ1ZSwgLy8gXHU1OTgyXHU2NzlDXHU1QjU4XHU1NzI4XHU2NzJDXHU1NzMwXHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHVGRjBDXHU1QzA2XHU1NzI4XHU2MjUzXHU1MzA1XHU1NDBFXHU4MUVBXHU1MkE4XHU1QzU1XHU3OTNBXG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBbUJBLE9BQU9BLFNBQVE7QUFDZixPQUFPQyxXQUFVO0FBQ2pCLE9BQU9DLGNBQWE7QUFDcEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBT0MsWUFBVzs7O0FDdkI2UyxPQUFPLGFBQWE7QUFPNVUsU0FBUyxXQUFXLFNBQWM7QUFDdkMsUUFBTSxNQUFXLENBQUM7QUFHbEIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFFMUMsUUFBSSxXQUFXLFFBQVEsT0FBTyxFQUFFLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQVcsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFHdkUsUUFBSSxZQUFZLGdCQUFnQixVQUFVO0FBQ3hDLFVBQUk7QUFDRixtQkFBVyxLQUFLLE1BQU0sU0FBUyxRQUFRLE1BQU0sR0FBRyxDQUFDO0FBQUEsTUFDbkQsU0FDTyxPQUFPO0FBQ1osbUJBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUdBLFFBQUksT0FBTyxJQUFJO0FBQ2YsUUFBSSxPQUFPLGFBQWEsVUFBVTtBQUNoQyxjQUFRLElBQUksT0FBTyxJQUFJO0FBQUEsSUFDekIsV0FDUyxPQUFPLGFBQWEsVUFBVTtBQUNyQyxjQUFRLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxRQUFRO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUOzs7QUM1QkEsSUFBTSxVQUFVO0FBUVQsU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRyxpQkFBeUI7QUFDekUsUUFBTSxNQUF1QixDQUFDO0FBQzlCLGFBQVcsQ0FB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QUM7QUFBQSxJQUM3QztBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04saUJBQWlCLEtBQUssVUFBVTtBQUFBLFFBQzlCLEtBQUs7QUFBQSxVQUNILGNBQWMsZ0JBQUk7QUFBQSxVQUNsQixpQkFBaUIsZ0JBQUk7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsZUFBZUMsT0FBTSxFQUFFLE9BQU8scUJBQXFCO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDbkQsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0MsTUFBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUNsQyxLQUFLQSxNQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCLGNBQWMsS0FBSyxFQUFFO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJmcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZGF5anMiLCAicGF0aCIsICJwcm9jZXNzIiwgInByb2Nlc3MiLCAicHJvY2VzcyIsICJmcyIsICJkYXlqcyIsICJwYXRoIl0KfQo=
