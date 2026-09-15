type Page = "home" | "dashboard" | "productos" | "producto";

const store = {
  navigate: null as ((page: Page) => void) | null,
  setProductSlug: null as ((slug: string) => void) | null,
};

export function registerNavigate(fn: (page: Page) => void) {
  store.navigate = fn;
}

export function registerProductSlug(fn: (slug: string) => void) {
  store.setProductSlug = fn;
}

export function goTo(page: Page) {
  store.navigate?.(page);
}

export function goToProduct(slug: string) {
  store.setProductSlug?.(slug);
  store.navigate?.("producto");
}
