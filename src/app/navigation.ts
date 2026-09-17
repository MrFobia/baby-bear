type Page = "home" | "dashboard" | "productos" | "producto";
export type Lang = "es" | "en";

const store = {
  navigate: null as ((page: Page) => void) | null,
  setProductSlug: null as ((slug: string) => void) | null,
  toggleLang: null as (() => void) | null,
};

export function registerNavigate(fn: (page: Page) => void) {
  store.navigate = fn;
}

export function registerProductSlug(fn: (slug: string) => void) {
  store.setProductSlug = fn;
}

export function registerToggleLang(fn: () => void) {
  store.toggleLang = fn;
}

export function toggleLang() {
  store.toggleLang?.();
}

export function goTo(page: Page) {
  store.navigate?.(page);
}

export function goToProduct(slug: string) {
  store.setProductSlug?.(slug);
  store.navigate?.("producto");
}
