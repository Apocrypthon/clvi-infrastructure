/**
 * The map of Strata. One entry per sibling repo in the CLVI relay.
 *
 * Netlify site names are assumed to match the GitHub repo names; if a site was
 * created under a different name, correct it here and in docs/ENVIRONMENT.md —
 * those two must never disagree.
 */

export const GITHUB_OWNER = "Apocrypthon";
export const LOOP_BRANCH = "loop";

export interface Site {
  /** GitHub repo name, also used as the Netlify site name. */
  readonly repo: string;
  /** Short label for the tile. */
  readonly label: string;
  /** One line on what this piece of Strata is. */
  readonly blurb: string;
  /**
   * Path probed for live status, relative to the loop deploy. Only set it where
   * the response carries CORS headers — everything else degrades to a link.
   */
  readonly healthPath?: string;
}

export const SITES: readonly Site[] = [
  {
    repo: "clvi-frontend",
    label: "frontend",
    blurb: "Shell, auth, dashboards",
  },
  {
    repo: "clvi-game-client",
    label: "game client",
    blurb: "Map, cells, tycoon loop",
  },
  {
    repo: "clvi-backend",
    label: "backend",
    blurb: "API, audit chain, Supabase",
    healthPath: "/health",
  },
  {
    repo: "clvi-testing",
    label: "testing",
    blurb: "Contract + smoke suites",
  },
];

export const netlifySite = (site: Site): string => site.repo;

/** Branch deploy for the `loop` branch — what the relay ships to. */
export const loopUrl = (site: Site): string =>
  `https://${LOOP_BRANCH}--${netlifySite(site)}.netlify.app`;

/** Production deploy, which follows `main`. */
export const prodUrl = (site: Site): string =>
  `https://${netlifySite(site)}.netlify.app`;

export const actionsUrl = (site: Site): string =>
  `https://github.com/${GITHUB_OWNER}/${site.repo}/actions`;

export const repoUrl = (site: Site): string =>
  `https://github.com/${GITHUB_OWNER}/${site.repo}`;

export const healthUrl = (site: Site): string | undefined =>
  site.healthPath ? loopUrl(site) + site.healthPath : undefined;

/** This repo, whose docs the dashboard links to. */
export const INFRA_REPO = "clvi-infrastructure";

/** A file in this repo, on the branch the relay ships from. */
export const docUrl = (path: string): string =>
  `https://github.com/${GITHUB_OWNER}/${INFRA_REPO}/blob/${LOOP_BRANCH}/${path}`;
