import "./style.css";
import {
  SITES,
  actionsUrl,
  healthUrl,
  loopUrl,
  prodUrl,
  repoUrl,
  docUrl,
  type Site,
} from "./sites";
import { probe } from "./health";

const app = document.querySelector<HTMLDivElement>("#app")!;

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const chip = (label: string, href: string, kind: string): HTMLAnchorElement => {
  const a = el("a", "chip", label);
  a.href = href;
  a.dataset.kind = kind;
  a.rel = "noreferrer";
  return a;
};

function tile(site: Site): { node: HTMLElement; site: Site; status: HTMLElement } {
  const node = el("section", "tile");

  const head = el("div", "tile-head");
  const dot = el("span", "dot");
  dot.dataset.status = "idle";
  head.append(dot, el("span", "tile-name", site.label));

  const status = el("div", "tile-status", site.healthPath ? "checking…" : "link only");
  if (site.healthPath) dot.dataset.status = "checking";

  const links = el("div", "links");
  links.append(
    chip("loop", loopUrl(site), "loop"),
    chip("prod", prodUrl(site), "prod"),
    chip("actions", actionsUrl(site), "actions"),
  );

  node.append(head, el("p", "tile-blurb", site.blurb), status, links);
  return { node, site, status };
}

function row(what: string, where: string, href: string): HTMLAnchorElement {
  const a = el("a", "row");
  a.href = href;
  a.rel = "noreferrer";
  a.append(el("span", "what", what), el("span", "where", where));
  return a;
}

function render(): void {
  const header = el("header");
  header.append(
    el("h1", undefined, "clvi-infrastructure"),
    el("p", "build", `build ${__BUILD_TIME__}`),
  );

  const tilesHeading = el("h2", undefined, "Strata");
  const tiles = el("div", "tiles");
  const built = SITES.map(tile);
  tiles.append(...built.map((t) => t.node));

  const mocksHeading = el("h2", undefined, "Canonical mocks · Contracts v1");
  const mocks = el("div", "rows");
  mocks.append(
    row("AuditReport", "/mock/audit.json", "/mock/audit.json"),
    row("MapEvent[]", "/mock/map-events.json", "/mock/map-events.json"),
  );

  const docsHeading = el("h2", undefined, "Docs");
  const docs = el("div", "rows");
  docs.append(
    row("Environment", "docs/ENVIRONMENT.md", docUrl("docs/ENVIRONMENT.md")),
    row("State", "docs/STATE.md", docUrl("docs/STATE.md")),
    row("Changelog", "docs/CHANGELOG.md", docUrl("docs/CHANGELOG.md")),
  );

  const reposHeading = el("h2", undefined, "Repos");
  const repos = el("div", "links");
  repos.append(...SITES.map((site) => chip(site.repo, repoUrl(site), "repo")));

  const footer = el("footer");
  footer.append(
    el(
      "p",
      undefined,
      "Secret names live in docs/ENVIRONMENT.md. Values never live here.",
    ),
  );

  app.append(
    header,
    tilesHeading,
    tiles,
    mocksHeading,
    mocks,
    docsHeading,
    docs,
    reposHeading,
    repos,
    footer,
  );

  void checkAll(built);
}

async function checkAll(
  built: { node: HTMLElement; site: Site; status: HTMLElement }[],
): Promise<void> {
  await Promise.all(
    built.map(async ({ node, site, status }) => {
      const url = healthUrl(site);
      if (!url) return;
      const result = await probe(url);
      const dot = node.querySelector<HTMLElement>(".dot")!;
      dot.dataset.status = result.status;
      status.textContent = result.detail;
    }),
  );
}

render();
