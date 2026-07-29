type Page = "home" | "dashboard";

const store = { navigate: null as ((page: Page) => void) | null };

export function registerNavigate(fn: (page: Page) => void) {
  store.navigate = fn;
}

export function goTo(page: Page) {
  store.navigate?.(page);
}
